const Principal = require('../models/principal');

exports.getAll = (req, res, next) => {
    Principal.findAll({
        order: [
            ['titulo', 'ASC']
        ]
    }).then(principal => {
        res.render('principal/index', {principal : principal}); //Envia para principal/index?
    })
}

exports.renderNovo = (req, res, next) => {
    res.render('principal/novo');
}

exports.create = (req, res, next) => {
    const nome = req.body.nome;

    Principal.findOne({
        where: {
            nome : nome
        }
    }).then(principal => {
        if(principal == undefined)
        {
            Principal.create({
                nome: nome
            }).then(() => {
                res.redirect('/principais');
            })
        }
        else
        {
            res.redirect('/principais');
        }
    })
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;
    Principal.findByPk(id).then(principal => {
        res.render('principal/editar', {principal : principal});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;

    Principal.update({
        nome: nome
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/principais');
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Principal.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/principais');
    });
}