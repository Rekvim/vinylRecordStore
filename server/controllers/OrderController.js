const { Order, BasketProduct } = require('../models/models')

class OrderController {
	async create(req, res) {
		try {
			const { basketId, products } = req.body

			if (!products || !products.length) {
				return res.status(400).json({ message: 'Товары не найдены в корзине' })
			}

			const orders = await Promise.all(
				products.map(async (product) => {
					const order = await Order.create({
						product: product.product,
						basketProductId: product.basketProductId,
					})
					return order
				})
			)

			res.json(orders)
		} catch (error) {
			console.error('Ошибка при создании заказа:', error) // логирование ошибки
			res.status(500).json({ message: 'Ошибка сервера' })
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
