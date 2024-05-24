const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(2), genreController.create)
router.get('/', genreController.get)

module.exports = router
