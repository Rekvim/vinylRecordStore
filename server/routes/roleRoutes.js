const Router = require('express')
const router = new Router()
const roleController = require('../controllers/roleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(), roleController.create)
router.get('/', roleController.get)

module.exports = router
