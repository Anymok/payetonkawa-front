const { Router } = require('express')
const service = require('../controller/customer_controller')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.get("/", authenticate, service.getAllCustomers)
router.get("/:idUser", authenticate, service.getCustomerById)
router.get("/:idUser/orders", authenticate, service.getCustomerOrdersList)
router.post("/", authenticate, service.createCustomer)

module.exports = router