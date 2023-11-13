const express = require('express');
const router = express.Router();

const AutorController = require('../controllers/AutorController');
const checkLogin = require('../middleware/checkLogin');
 
router.get('/', AutorController.getAll); // Pega todos
router.post('/autores', AutorController.getAll); //Para mostrar todos na tela???
router.get('/novo', AutorController.renderNovo); // Renderiza
router.post('/', AutorController.create); // Cria novo
router.get('/:id', AutorController.renderEditar); // Edita
router.post('/salvar', AutorController.update); // Atualiza
router.get('/delete/:id', AutorController.delete); // Deleta

module.exports = router;