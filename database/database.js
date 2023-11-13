const Sequelize = require('sequelize');

const connection = new Sequelize(
    'fantasywhisper',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;