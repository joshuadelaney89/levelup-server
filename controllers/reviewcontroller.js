let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const user = require('../models/user');
let Review = require('../db').import('../models/review');


router.get('/practice', validateSession, function(req, res) {
    res.send('Hey!! This is a practice route!')
});

/******************************
    *** CREATE REVIEW ***
******************************/

router.post('/create', validateSession, (req, res) => {
    const reviewEntry = {
        name: req.body.review.name,
        date: req.body.review.date,
        platform: req.body.review.platform,
        entry: req.body.review.entry,
        user_id: req.user.id
    }
    Review.create(reviewEntry)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({error: err}))
});

/******************************
  *** GET REVIEWS BY USER ***
******************************/

router.get('/', validateSession, (req, res) => {
    let userId = req.user.id
    Review.findAll({
        where: {user_id: userId}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error: err}))
});

/*******************************************
  *** GET INDIVIDUAL REVIEWS BY USER ***
*******************************************/

router.get("/:id", validateSession, (req, res) => {
    let reviewId = req.params.id;
    let userId = req.user.id;
    Review.findOne({
        where: {id: reviewId, user_id: userId}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error: err}))
});

/******************************
  *** UPDATE REVIEWS ***
******************************/

router.put("/update/:entryId", validateSession, function (req, res) {
    const updateReviewEntry = {
        name: req.body.review.name,
        date: req.body.review.date,
        platform: req.body.review.platform,
        entry: req.body.review.entry,
    };

    const query = {where: {id: req.params.entryId, user_id: req.user.id}};

    Review.update(updateReviewEntry, query)
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json({error: err}));
});

/******************************
  *** DELETE REVIEWS ***
******************************/

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = {where: {id: req.params.id, user_id: req.user.id}}

    Review.destroy(query)
    .then(() => res.status(200).json({message: "Review Deleted"}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router;