const express = require('express');
const router = express.Router();

const GeneroController = require('../controllers/GeneroController');
const checkLogin = require('../middleware/checkLogin');
 
router.get('/', GeneroController.getAll);
router.get('/novo', GeneroController.renderNovo);
router.post('/', GeneroController.create);
router.get('/:id', GeneroController.renderEditar);
router.post('/salvar', GeneroController.update);
router.get('/delete/:id', GeneroController.delete);

module.exports = router;