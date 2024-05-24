import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async (telephone, password) => {
	const { data } = await $host.post('api/users/registration', {
		telephone,
		password,
		roleId: 1,
	})
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
export const login = async (telephone, password) => {
	const { data } = await $host.post('api/users/login', { telephone, password })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
export const check = async () => {
	const { data } = await $authHost.get('/api/users/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
