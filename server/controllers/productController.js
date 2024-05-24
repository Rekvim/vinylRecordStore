const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class ProductController {
	async create(req, res, next) {
		try {
			let { name, authorId, price, genreId, categoryId, image_url, info } =
				req.body

			const product = await Product.create({
				name,
				price,
				authorId,
				genreId,
				categoryId,
				image_url,
			})
			if (info) {
				info = JSON.parse(info)
				info.forEach((i) =>
					ProductInfo.create({
						title: i.title,
						description: i.description,
						productId: product.id,
					})
				)
			}
			return res.json(product)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async getAll(req, res) {
		let { name, genreId, page, limit, minPrice, maxPrice } = req.query

		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		const whereClause = {
			...(genreId && { genreId }),
			...(name && { name: { [Op.iLike]: `%${name}%` } }),
			...(minPrice && { price: { [Op.gte]: minPrice } }),
			...(maxPrice && { price: { [Op.lte]: maxPrice } }),
		}
		const products = await Product.findAndCountAll({
			where: whereClause,
			limit,
			offset,
		})
		return res.json(products)
	}

	async getOne(req, res) {
		const { id } = req.params
		const product = await Product.findOne({
			where: { id },
			include: [{ model: ProductInfo, as: 'info' }],
		})
		return res.json(product)
	}
}

module.exports = new ProductController()
