const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoriteController')

router.post('/', favoriteController.create)
router.delete('/', favoriteController.destroy) // Update this line
router.get('/:userId', favoriteController.get)

module.exports = router
