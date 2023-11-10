const express = require('express');
const router = express.Router();

const PrincipalController = require('../controllers/PrincipalController');
const checkLogin = require('../middleware/checkLogin');
 
router.get('/', PrincipalController.getAll);
router.get('/novo', PrincipalController.renderNovo);
router.post('/', PrincipalController.create);
router.get('/:id', PrincipalController.renderEditar);
router.post('/salvar', PrincipalController.update);
router.get('/delete/:id', PrincipalController.delete);

module.exports = router;