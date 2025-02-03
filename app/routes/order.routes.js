const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/user/:id', orderController.getAllOrder)
router.post('/user/:id/add', orderController.createOrder)
router.delete('/user/:id/product/:codeProduct', orderController.removeFromOrder)
router.put('/user/:id/update-quantity', orderController.updateFromOrder)

module.exports = router