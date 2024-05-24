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
		const { telephone, password, roleId } = req.body

		if (!telephone || !password) {
			return next(ApiError.badRequest('Некорректный telephone или password'))
		}

		const candidate = await User.findOne({ where: { telephone } })

		if (candidate) {
			return next(
				ApiError.badRequest('Пользователь с таким telephone ужe существует !')
			)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const users = await User.create({
			telephone,
			password: hashPassword,
			roleId,
		})
		const basket = await Basket.create({ userId: users.id }) // Создание пользователя
		const token = generateJWT(users.id, users.telephone, users.roleId) // Параметры из которых мы генерируем токен
		return res.json({ token })
	}
	async login(req, res, next) {
		const { telephone, password } = req.body

		const users = await User.findOne({ where: { telephone } })

		if (!users) {
			return next(ApiError.internal('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, users.password)
		if (!comparePassword) {
			return next(ApiError.internal('Указан неверный пароль'))
		}
		const token = generateJWT(users.id, users.telephone, users.roleId)
		return res.json({ token })
	}
	async check(req, res, next) {
		// res.json({ message: 'ALL RIGHT' })
		const token = generateJWT(
			req.users.id,
			req.users.telephone,
			req.users.roleId
		)
		return res.json({ token })
	}
}

module.exports = new UserController()
