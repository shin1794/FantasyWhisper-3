const Sequelize = require('sequelize');
const connection = require('../database/database');
const Autor = require('./autor');
const Genero = require('./genero');

const Principal = connection.define(
    'principal',
    {
        titulo: 
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        capitulo: 
        {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        conteudo: 
        {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

Principal.belongsTo(Autor);
Principal.belongsTo(Genero);

//Principal.sync({force: true});

module.exports = Principal;