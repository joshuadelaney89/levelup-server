require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let review = require('./controllers/reviewcontroller');
let rating = require('./controllers/ratingcontroller');

sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);
app.use('/review', review);
app.use('/rating', rating);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})