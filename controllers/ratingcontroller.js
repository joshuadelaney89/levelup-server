let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const user = require('../models/user');
const review = require('../models/review');
let Rating = require('../db').import('../models/rating');

router.get('/practice', validateSession, function(req, res) {
    res.send('Hey!! This is a practice route!')
});

/******************************
    *** CREATE RATING ***
******************************/

router.post('/create', validateSession, (req, res) => {
    const ratingEntry = {
        vote: req.body.rating.vote,
        user_id: req.user.id
    }
    Rating.create(ratingEntry)
    .then(rating => res.status(200).json(rating))
    .catch(err => res.status(500).json({error: err}))
});

/******************************
  *** GET RATINGS BY USER ***
******************************/

router.get('/', validateSession, (req, res) => {
    let userId = req.user.id
    Rating.findAll({
        where: {user_id: userId}
    })
    .then(ratings => res.status(200).json(ratings))
    .catch(err => res.status(500).json({error: err}))
});

/*******************************************
  *** GET INDIVIDUAL RATINGS BY USER ***
*******************************************/

router.get("/:id", validateSession, (req, res) => {
    let ratingId = req.params.id;
    let userId = req.user.id;
    Rating.findOne({
        where: {id: ratingId, user_id: userId}
    })
    .then(ratings => res.status(200).json(ratings))
    .catch(err => res.status(500).json({error: err}))
});

/******************************
  *** UPDATE RATINGS ***
******************************/

router.put("/update/:entryId", validateSession, function (req, res) {
    const updateRatingEntry = {
        vote: req.body.rating.vote
    };

    const query = {where: {id: req.params.entryId, user_id: req.user.id}};

    Rating.update(updateRatingEntry, query)
    .then((ratings) => res.status(200).json(ratings))
    .catch((err) => res.status(500).json({error: err}));
});

/******************************
  *** DELETE RATINGS ***
******************************/

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = {where: {id: req.params.id, user_id: req.user.id}}

    Rating.destroy(query)
    .then(() => res.status(200).json({message: "Rating Deleted"}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router;