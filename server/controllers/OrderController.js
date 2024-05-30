const { Order, BasketProduct } = require('../models/models')

class OrderController {
	async create(req, res) {
		try {
			const { productId, quantity } = req.body

			// Находим товар в корзине по его ID
			const basketProduct = await BasketProduct.findByPk(productId)
			if (!basketProduct) {
				return res.status(404).json({ message: 'Товар не найден в корзине' })
			}

			// Создаем заказ с указанным товаром и количеством
			const order = await Order.create({
				product: basketProduct.product,
				BasketProductId: basketProduct.id, // Привязываем к товару из корзины
			})

			res.json(order)
		} catch (error) {
			console.error(error)
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
