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

		page = parseInt(page) || 1
		limit = parseInt(limit) || 9
		let offset = page * limit - limit

		// Преобразование значений цены в числа или установление undefined
		minPrice = minPrice ? parseFloat(minPrice) : undefined
		maxPrice = maxPrice ? parseFloat(maxPrice) : undefined

		const whereClause = {
			...(genreId && { genreId }),
			...(name && { name: { [Op.iLike]: `%${name}%` } }),
		}

		if (minPrice !== undefined || maxPrice !== undefined) {
			whereClause.price = {}
			if (minPrice !== undefined) whereClause.price[Op.gte] = minPrice
			if (maxPrice !== undefined) whereClause.price[Op.lte] = maxPrice
		}

		console.log('Where clause:', whereClause) // Debug line

		try {
			const products = await Product.findAndCountAll({
				where: whereClause,
				limit,
				offset,
			})
			return res.json(products)
		} catch (error) {
			console.error('Error fetching products:', error)
			return res.status(500).json({ message: 'Error fetching products' })
		}
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
