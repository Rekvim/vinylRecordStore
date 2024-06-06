const { Order } = require('../models/models')

class OrderController {
	async create(req, res) {
		try {
			const { userId, products, address } = req.body

			if (!address || Object.keys(address).length === 0) {
				return res.status(400).json({ message: 'Адрес не указан' })
			}

			if (!Array.isArray(products) || products.length === 0) {
				return res.status(400).json({ message: 'Продуктов нет' })
			}

			const orders = await Promise.all(
				products.map((product) => {
					const { basketProductId, quantity, price } = product
					return Order.create({
						basketProductId,
						userId,
						quantity,
						price,
						address,
					})
				})
			)

			res.status(201).json(orders)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const orders = await Order.findAll()
			return res.json(orders)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при получении заказов' })
		}
	}
}

module.exports = new OrderController()
