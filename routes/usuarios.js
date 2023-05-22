var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')


/* GET users listing. */
router.get('/', usuariosController.getAll)
router.post('/', usuariosController.post)
router.get('/:id', usuariosController.getById)
router.post('/login', usuariosController.signedVerify)
module.exports = router;
