const { Order, BasketProduct } = require('../models/models')

class OrderController {
	async create(req, res) {
		try {
			const { basketProductId, product } = req.body
			const order = await Order.create({ basketProductId, product })
			return res.json(order)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при создании заказа' })
		}
	}

	async get(req, res) {
		try {
			const orders = await Order.findAll()
			return res.json(orders)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при получении заказов' })
		}
	}
}

module.exports = new OrderController()
