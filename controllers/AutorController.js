const Autor = require('../models/autor');
const {fmDate, DataParaBanco} = require('../utilidades');

exports.getAll = (req, res, next) => { // Pega todos
    Autor.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(autores => {
        res.render('autor/index', {autores: autores}); //Envia para autor/index?
    })
}

exports.renderNovo = (req, res, next) => { // Renderiza modelo de visualização (autor/novo)
    res.render('autor/novo');
}

exports.create = (req, res, next) => { // Cria autor
    const nome = req.body.nome;
    const nascimento = DataParaBanco(req.body.nascimento);
    const morte = DataParaBanco(req.body.morte);

    Autor.findOne({ // Busca autor pelo nome
        where: {
            nome : nome 
        }
    }).then(autor => {
        if(autor == undefined)
        {
            Autor.create({
                nome: nome,
                nascimento: nascimento,
                morte: morte
            }).then(() => {
                res.redirect('/autores');
            })
        }
        else
        {
            res.redirect('/autores');
        }
    })
}

exports.renderEditar = (req, res, next) => { // Busca autor
    const id = req.params.id;
    let nascimento = '';
    let morte = '';
    Autor.findByPk(id).then(autor => {
        nascimento = fmDate(autor.nascimento);
        if(autor.morte)
        {
            morte = fmDate(autor.morte);
        }
        res.render('autor/editar', {autor: {id: id, nome: autor.nome, nascimento: nascimento, morte: morte}});
    });
}

exports.update = (req, res, next) => { // Atualiza autor
    const id = req.body.id;
    const nome = req.body.nome;
    const nascimento = DataParaBanco(req.body.nascimento);
    const morte = DataParaBanco(req.body.morte);

    Autor.update({
        nome: nome,
        nascimento: nascimento,
        morte: morte
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/autores');
    });
}

exports.delete = (req, res) => { // Deleta autor
    const id = req.params.id;

    Autor.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/autores');
    });
}