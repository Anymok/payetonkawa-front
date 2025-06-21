const { Router } = require('express')
const service = require('../controller/order_controller')
const authenticate = require("../middlewares/authenticate")

const router = Router()

router.get('/', authenticate, service.getOrders)
router.get('/:id', authenticate, service.getOrderById)
router.post('/', authenticate, service.createOrder)
router.put('/:id', authenticate, service.updateOrderById)
router.delete('/:id', authenticate, service.deleteOrder)


module.exports = router