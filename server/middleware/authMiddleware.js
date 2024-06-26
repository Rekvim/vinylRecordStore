const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1] // Bearer asdadsd
		if (!token) {
			return res.status(401).json({ message: 'Не авторизован' })
		}
		const decoded = jwt.verify(token, 'random_secret_key')
		req.users = decoded
		next()
	} catch (e) {
		res.status(403).json({ message: 'Не авторизован' })
	}
}
