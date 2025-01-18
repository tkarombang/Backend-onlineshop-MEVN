const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/user/:id', orderController.getAllOrder)

module.exports = router