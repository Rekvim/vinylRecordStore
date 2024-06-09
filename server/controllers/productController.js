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
				// Если есть дополнительный параметр "info", то он разбивается на массив данных и записывается в таблицу "ProductInfo"
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
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
	async getAll(req, res, next) {
		let { name, genreId, page, limit, minPrice, maxPrice } = req.query

		// настройка "offset"
		page = parseInt(page) || 1
		limit = parseInt(limit) || 9
		let offset = page * limit - limit

		// Преобразование значений цены в числа или установление undefined
		minPrice = minPrice ? parseFloat(minPrice) : undefined
		maxPrice = maxPrice ? parseFloat(maxPrice) : undefined
		// логика фильтрации
		const whereClause = {
			...(genreId && { genreId }),
			...(name && { name: { [Op.iLike]: `%${name}%` } }),
		}

		if (minPrice !== undefined || maxPrice !== undefined) {
			whereClause.price = {}
			if (minPrice !== undefined) whereClause.price[Op.gte] = minPrice
			if (maxPrice !== undefined) whereClause.price[Op.lte] = maxPrice
		}

		// создание продукта
		try {
			const products = await Product.findAndCountAll({
				where: whereClause,
				limit,
				offset,
			})
			return res.json(products)
		} catch (error) {
			next(ApiError.badRequest(error.message))
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
