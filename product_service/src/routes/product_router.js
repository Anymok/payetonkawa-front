const { Router } = require('express')
const service = require('../controller/product_controller')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.get("/", service.getAllProduct)
router.get("/:idProduct", service.getProduct)
router.post("/",authenticate, service.createProduct)
router.put("/:idProduct",authenticate, service.updateProduct)
router.delete("/:idProduct",authenticate, service.deleteProduct)


module.exports = router