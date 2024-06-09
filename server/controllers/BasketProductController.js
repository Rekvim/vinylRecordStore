const { BasketProduct } = require('../models/models')

class BasketProductController {
	async create(req, res) {
		const { basketId, productId } = req.body
		const basketProduct = await BasketProduct.create({ basketId, productId })
		return res.json(basketProduct)
	}

	async destroy(req, res) {
		const { basketId, productId } = req.params
		try {
			await BasketProduct.destroy({ where: { basketId, productId } })
			return res.json({ message: 'Товар успешно удален из корзины' })
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async increaseQuantity(req, res) {
		const { basketId, productId } = req.params
		try {
			const basketProduct = await BasketProduct.findOne({
				where: { basketId, productId },
			})
			if (!basketProduct) {
				return res.status(404).json({ message: 'Товар не найден в корзине' })
			}
			basketProduct.quantity = parseInt(basketProduct.quantity) + 1
			await basketProduct.save()
			return res.json(basketProduct)
		} catch (error) {
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async decreaseQuantity(req, res) {
		const { basketId, productId } = req.params
		try {
			const basketProduct = await BasketProduct.findOne({
				where: { basketId, productId },
			})
			if (!basketProduct) {
				return res.status(404).json({ message: 'Товар не найден в корзине' })
			}
			if (basketProduct.quantity > 1) {
				basketProduct.quantity = parseInt(basketProduct.quantity) - 1
				await basketProduct.save()
				return res.json(basketProduct)
			}
			return res
				.status(400)
				.json({ message: 'Невозможно уменьшить количество товара до нуля' })
		} catch (error) {
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
	async get(req, res) {
		const { basketId } = req.params
		if (!basketId || isNaN(basketId)) {
			return res.status(400).json({ error: 'Invalid basketId' })
		}
		try {
			const basketProduct = await BasketProduct.findAll({ where: { basketId } })
			return res.json(basketProduct)
		} catch (error) {
			console.error('Error fetching basket products:', error)
			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}

module.exports = new BasketProductController()
