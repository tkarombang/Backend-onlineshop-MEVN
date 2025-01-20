const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getOneProduct)

module.exports = router
