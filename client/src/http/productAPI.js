import { $authHost, $host } from './index'

// Genres
export const createGenres = async (genre) => {
	const { data } = await $authHost.post('api/genres', genre)
	return data
}
export const fetchGenres = async () => {
	const { data } = await $host.get('/api/genres')
	return data
}

// Authors
export const createAuthors = async (author) => {
	const { data } = await $authHost.post('api/authors', author)
	return data
}
export const fetchAuthors = async () => {
	const { data } = await $host.get('/api/authors')
	return data
}

// Favorite
export const createFavorite = async (productId, userId) => {
	const { data } = await $authHost.post(`/api/favorites`, {
		productId,
		userId,
	})
	return data
}
export const removeFavorite = async (productId, userId) => {
	await $authHost.delete(`/api/favorites`, {
		data: { productId, userId },
	})
}
export const fetchFavorites = async (userId) => {
	const { data } = await $authHost.get(`/api/favorites/${userId}`)
	return data
}
// Basket
export const createBasketProduct = async (basketProduct) => {
	try {
		const response = await $authHost.post('/api/basketProducts', basketProduct)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании продукта в корзине', error)
		throw error
	}
}
export const removeBasketProduct = async (basketId, productId) => {
	try {
		const response = await $authHost.delete(
			`/api/basketProducts/${basketId}/${productId}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при удалении товара из корзины', error)
		throw error
	}
}
export const increaseBasketProductQuantity = async (basketId, productId) => {
	try {
		const response = await $authHost.put(
			`/api/basketProducts/increaseQuantity/${basketId}/${productId}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при увеличении количества товара в корзине', error)
		throw error
	}
}
export const decreaseBasketProductQuantity = async (basketId, productId) => {
	const { data } = await $authHost.put(
		`api/basketProducts/decreaseQuantity/${basketId}/${productId}`
	)
	return data
}
export const fetchBasket = async (basketId) => {
	const { data } = await $authHost.get(`/api/basketProducts/${basketId}`)
	return data
}
// Product
export const createProducts = async (product) => {
	const { data } = await $authHost.post('/api/products', product)
	return data
}
export const deleteProduct = async (id) => {
	const { data } = await $authHost.delete(`api/product/${id}`)
	return data
}
export const fetchProduct = async (
	genreId,
	name,
	minPrice,
	maxPrice,
	page,
	limit
) => {
	const { data } = await $host.get('api/products', {
		params: {
			genreId,
			name,
			minPrice,
			maxPrice,
			page,
			limit,
		},
	})
	return data
}

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('/api/products/' + id)
	return data
}

// Orders
export const createOrders = async (order) => {
	const { data } = await $authHost.post('/api/orders', order)
	return data
}
export const fetchOrders = async () => {
	const { data } = await $host.get('api/orders')
	return data
}
