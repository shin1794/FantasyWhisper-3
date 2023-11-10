const express = require('express');
const router = express.Router();
const Genero = require('../models/genero');

exports.getAll= (req, res, next) => {
    Genero.findAll({
        order: [
            ['genero', 'ASC']
        ]
    }).then(generos => {
        res.render('genero/index', {generos: generos}); //Envia para genero/index?
    })
}

exports.renderNovo = (req, res, next) => {
    res.render('genero/novo');
}

exports.create = (req, res, next) => {
    const genero = req.body.genero;

    Genero.findOne({
        where: {
            genero : genero
        }
    }).then(gen => {
        if(gen == undefined)
        {
            Genero.create({
                genero: genero
            }).then(() => {
                res.redirect('/generos');
            })
        }
        else
        {
            res.redirect('/generos');
        }
    })
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Genero.findByPk(id).then(genero => {
        res.render('genero/editar', {genero : genero});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const genero = req.body.genero;

    Genero.update({
        genero: genero
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Genero.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
}