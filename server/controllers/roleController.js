const { Role } = require('../models/models')

class RoleController {
	async create(req, res) {
		const { name } = req.body
		const role = await Role.create({ name })
		return res.json(role)
	}
	async get(req, res) {
		const role = await Role.findAll()
		return res.json(role)
	}
}

module.exports = new RoleController()
