const Router = require('express')
const router = new Router()
const newController = require('../controllers/newController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(2), newController.create)
router.get('/', newController.get)
router.get('/:id', newController.getOne)

module.exports = router
