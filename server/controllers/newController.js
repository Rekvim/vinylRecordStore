const { New, NewInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class NewController {
	async create(req, res, next) {
		try {
			let { title, description, info } = req.body
			const news = await New.create({ title, description })
			if (info) {
				info = JSON.parse(info)
				info.forEach((i) =>
					NewInfo.create({
						title: i.title,
						description: i.description,
						newsId: news.id,
					})
				)
			}
			return res.json(news)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async get(req, res) {
		let { limit, page } = req.query
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		const news = await New.findAndCountAll({
			limit,
			offset,
		})
		return res.json(news)
	}
	async getOne(req, res) {
		const { id } = req.params
		const news = await New.findOne({
			where: { id },
			include: [{ model: NewInfo, as: 'info' }],
		})
		return res.json(news)
	}
}

module.exports = new NewController()
