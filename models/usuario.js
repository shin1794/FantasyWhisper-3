const Sequelize = require('sequelize');
const connection = require('../database/database');

const Usuario = connection.define(
    'usuario',
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                isEmail: {
                    args: true,
                    msg: "Dado do tipo e-mail inválido"
                }
            }
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                funcaoValidadora: function(dado) {
                    if(dado.lenght < 3) throw new Error("O campo nome deve ter mais de 3 caracteres.")
                }
            }
            
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//Usuario.sync({force: true});

module.exports = Usuario;