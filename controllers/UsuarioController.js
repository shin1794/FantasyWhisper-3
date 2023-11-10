const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); // Para criptografia

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(usuarios => {
        res.render('usuario/index',{usuarios : usuarios}); //Envia para usuario/index?
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('usuario/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            email : email
        }
    }).then(usuario => {
        if(usuario == undefined)
        {
            const salt = bcrypt.genSaltSync();
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            Usuario.create({
                nome : nome,
                email : email,
                senha : senhaCriptografada
            }).then(() => {
                res.redirect('/usuarios');
            })
        }
        else
        {
            res.redirect('/usuarios');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Usuario.findByPk(id).then(usuario => {
        res.render('usuario/editar', {usuario: usuario});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    Usuario.update({
        nome : nome,
        email : email
    },{
        where : {
            id : id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
}

exports.renderLogin = (req, res, next) => {
    res.render('login', {msg: ''});
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            email : email
        }
    }).then(usuario => {
        if(usuario != undefined)
        {
            const deuCerto = bcrypt.compareSync(senha, usuario.senha);
            if(deuCerto)
            {
                req.session.login = {
                    nome: usuario.nome
                }

                res.redirect('/');
            }
            else
            {
                res.render('login', {msg: 'Usuário ou senha inválidos!'});
            }
        }
        else
        {
            res.render('login', {msg: 'Usuário ou senha inválidos!'});
        }
    })
}