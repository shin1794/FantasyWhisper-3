const express = require('express');
const router = express.Router();

const HistoriaController = require('../controllers/HistoriaController');
const checkLogin = require('../middleware/checkLogin');
 
router.get('/', HistoriaController.getAll);
router.post('/historias', HistoriaController.getAll); //Para mostrar todos na tela???
router.get('/novo', HistoriaController.renderNovo);
router.post('/', HistoriaController.create);
router.get('/:id', HistoriaController.renderEditar);
router.post('/salvar', HistoriaController.update);
router.get('/delete/:id', HistoriaController.delete);

module.exports = router;