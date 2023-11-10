const Sequelize = require('sequelize');

const connection = new Sequelize(
    'fantasywhisper',
    'rashomon',
    '33611794',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;