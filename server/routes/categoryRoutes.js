const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(2), categoryController.create)
router.get('/', categoryController.get)

module.exports = router
