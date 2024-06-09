const { Favourite } = require('../models/models')

class FavouriteController {
	async create(req, res) {
		const { productId, userId } = req.body
		try {
			const favourite = await Favourite.create({
				productId,
				userId,
			})
			return res.json(favourite)
		} catch (error) {
			console.error('Ошибка при добавлении в избранное', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async destroy(req, res) {
		const { productId, userId } = req.body // Ensure productId and userId are taken from req.body
		try {
			await Favourite.destroy({ where: { productId, userId } })
			return res.json({ message: 'Элемент успешно удален из избранного' })
		} catch (error) {
			console.error('Ошибка при удалении из избранного', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async get(req, res) {
		const { userId } = req.params
		try {
			const favourites = await Favourite.findAll({ where: { userId } })
			return res.json(favourites)
		} catch (error) {
			console.error('Ошибка при получении списка избранного', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
}

module.exports = new FavouriteController()
