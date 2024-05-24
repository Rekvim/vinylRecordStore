const { Genre } = require('../models/models')

class GenreController {
	async create(req, res) {
		const { name } = req.body
		const genres = await Genre.create({ name })
		return res.json(genres)
	}
	async get(req, res) {
		const genres = await Genre.findAll()
		return res.json(genres)
	}
}

module.exports = new GenreController()
