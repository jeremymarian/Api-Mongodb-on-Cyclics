var express = require('express');
var router = express.Router();
const productosController = require('../controllers/productosController')


/* GET users listing. */
router.get('/', productosController.getAll)
router.post('/', productosController.post)
router.get('/:id', productosController.getById)

module.exports = router;
