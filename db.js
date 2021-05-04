const Sequelize = require('sequelize');
const sequelize = new Sequelize('levelup', 'postgres','password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to the levelup postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;