const { Router } = require('express')
const service = require('../controller/inventory_controller')
const authenticate = require("../middlewares/authenticate")

const router = Router()

router.get("/:idProduct", authenticate, service.getStockProduct)
router.post("/", authenticate, service.createStock)
router.put("/:idProduct", authenticate, service.updateStockProduct)
router.delete("/:idProduct", authenticate, service.deleteStockProduct)


module.exports = router