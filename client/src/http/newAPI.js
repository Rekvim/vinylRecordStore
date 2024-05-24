import { $authHost, $host } from './index'

export const createNews = async (news) => {
	const { data } = await $authHost.post('api/news', news)
	return data
}
export const fetchNews = async (page, limit) => {
	const { data } = await $host.get('/api/news', {
		params: {
			page,
			limit,
		},
	})
	return data
}
export const fetchOneNews = async (id) => {
	const { data } = await $host.get('/api/news/' + id)
	return data
}
