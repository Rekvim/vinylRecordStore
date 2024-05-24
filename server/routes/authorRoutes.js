const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(2), authorController.create)
router.get('/', authorController.get)

module.exports = router
