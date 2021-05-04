const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
        vote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    })
    return Rating;
}