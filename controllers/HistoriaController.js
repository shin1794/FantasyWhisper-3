const Historias = require('../models/historia');
const Autor = require('../models/autor');
const Genero = require('../models/genero');

exports.getAll = (req, res, next) => {
    Historias.findAll({
        order: [
            ['titulo', 'ASC']
        ],
        include: [{
            model: Autor
        }]
    }).then(historias => {
        res.render('historia/index', {historias : historias}); //Envia para hitoria/index?
    })
}

exports.renderNovo = (req, res, next) => {
    Autor.findAll({
        order: [
            ['nome', 'ASC']
        ],
        attributes: [
            'id',
            'nome'
        ]
    }).then(autores => {
    Genero.findAll({
        order: [
            ['genero', 'ASC']
        ],
        attributes: [
            'id',
            'genero'
        ]
    }).then(generos => {
        res.render('historia/novo', {autores: autores, generos: generos});
    });
    });
}

exports.create = (req, res, next) => {
    const titulo = req.body.titulo;
    const capitulo = req.body.capitulo;
    const autorId = req.body.autorId;
    const generoId = req.body.generoId;
    const conteudo = req.body.conteudo;

    Historias.findOne({
        where: {
            titulo : titulo
        }
    }).then(historia => {
        if(historia == undefined)
        {
            Historias.create({
                titulo : titulo,
                capitulo : capitulo,
                autorId : autorId,
                generoId : generoId,
                conteudo : conteudo
            }).then(() => {
                res.redirect('/historias');
            })
        }
        else
        {
            res.redirect('/historias');
        }
    })
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Historias.findByPk(id).then(historia => { // Encontra pela PK
        Autor.findAll({
            order: [
                ['nome', 'ASC']
            ],
            attributes: [
                'id',
                'nome'
            ]
        }).then(autores => {
        Genero.findAll({
            order: [
                ['genero', 'ASC']
            ],
            attributes: [
                'id',
                'genero'
            ]
            }).then(generos => {
                res.render('historia/editar', {historia: historia, autores: autores, generos: generos});
            });
        });
        });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const capitulo = req.body.capitulo;
    const autorId = req.body.autorId;
    const generoId = req.body.generoId;
    const conteudo = req.body.conteudo;

    Historia.update({
        titulo : titulo,
        capitulo : capitulo,
        autorId : autorId,
        generoId : generoId,
        conteudo : conteudo
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/historias');
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Historias.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/historias');
    });
}