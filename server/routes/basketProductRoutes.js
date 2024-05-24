const Router = require('express')
const router = new Router()
const basketProductController = require('../controllers/BasketProductController')

router.post('/', basketProductController.create)
router.delete('/:basketId/:productId', basketProductController.destroy)
router.get('/', basketProductController.get)
router.put(
	'/increaseQuantity/:basketId/:productId',
	basketProductController.increaseQuantity
)
router.put(
	'/decreaseQuantity/:basketId/:productId',
	basketProductController.decreaseQuantity
) // Новый маршрут

module.exports = router
