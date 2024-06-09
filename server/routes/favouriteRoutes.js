const Router = require('express')
const router = new Router()
const favouriteController = require('../controllers/favouriteController')

router.post('/', favouriteController.create)
router.delete('/', favouriteController.destroy) // Update this line
router.get('/:userId', favouriteController.get)

module.exports = router
