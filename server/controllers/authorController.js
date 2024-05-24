const { Author } = require('../models/models')

class AuthorController {
	async create(req, res) {
		const { name } = req.body
		const authors = await Author.create({ name })
		return res.json(authors)
	}
	async get(req, res) {
		const authors = await Author.findAll()
		return res.json(authors)
	}
}

module.exports = new AuthorController()
