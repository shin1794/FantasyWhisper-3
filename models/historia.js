const Sequelize = require('sequelize');
const connection = require('../database/database');
const Autor = require('./autor');
const Genero = require('./genero');

const Historia = connection.define('historia', {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capitulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        conteudo: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

Historia.belongsTo(Autor);
Historia.belongsTo(Genero);

//Historia.sync({force: true});

module.exports = Historia;