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

	async get(req, res) {
		const basketProduct = await BasketProduct.findAll()
		return res.json(basketProduct)
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
			console.error('Ошибка при увеличении количества товара в корзине', error)
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
			console.error('Ошибка при уменьшении количества товара в корзине', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
}

module.exports = new BasketProductController()
