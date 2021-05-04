const User = require('./user');
const Review = require('./review');
const Rating = require('./rating');

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

module.exports = {
    User,
    Review,
    Rating,
};