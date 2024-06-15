const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJWT = (id, telephone, roleId) => {
	return jwt.sign({ id, telephone, roleId }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
}

class UserController {
	async registration(req, res, next) {
		const { telephone, password, roleId } = req.body // Изъятие данных из тела запроса
		// Проверка данных
		if (!telephone || !password) {
			return next(ApiError.badRequest('Некорректный telephone или password'))
		}
		// Поиск пользователя для проверки на его существования
		const candidate = await User.findOne({ where: { telephone } })

		if (candidate) {
			// Проверка на существование пользователя
			return next(
				ApiError.badRequest('Пользователь с таким telephone ужe существует !')
			)
		}
		// Хеширование пароля в 5 итерация
		const hashPassword = await bcrypt.hash(password, 5)
		// Создание пользователя и запись его данных в переменные
		const users = await User.create({
			telephone,
			password: hashPassword,
			roleId,
		})
		const basket = await Basket.create({ userId: users.id }) // Создание корзины пользователя
		const token = generateJWT(users.id, users.telephone, users.roleId) // Генерация токена, по параметрам пользователя
		return res.json({ token }) // Возврат токена
	}

	async login(req, res, next) {
		// Изъятие данных из тела запроса
		const { telephone, password } = req.body

		try {
			// Поиск пользователя для проверки на его существование
			const user = await User.findOne({ where: { telephone } })

			if (!user) {
				return next(ApiError.badRequest('Пользователь не найден'))
			}

			// Сравнение введенного пароля и захешированного пароля из базы данных
			const comparePassword = await bcrypt.compare(password, user.password)
			if (!comparePassword) {
				return next(ApiError.badRequest('Указан неверный пароль'))
			}

			// Генерация токена по параметрам пользователя
			const token = generateJWT(user.id, user.telephone, user.roleId)
			return res.json({ token }) // Возврат токена
		} catch (error) {
			return next(ApiError.internal('Внутренняя ошибка сервера', error))
		}
	}
	async check(req, res, next) {
		const token = generateJWT(
			req.users.id,
			req.users.telephone,
			req.users.roleId
		)
		return res.json({ token }) // Возврат токена
	}
}

module.exports = new UserController()
