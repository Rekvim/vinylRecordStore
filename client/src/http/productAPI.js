import { $authHost, $host } from './index'

export const createGenres = async (genre) => {
	const { data } = await $authHost.post('api/genres', genre)
	return data
}

export const createAuthors = async (author) => {
	const { data } = await $authHost.post('api/authors', author)
	return data
}

export const createProducts = async (product) => {
	const { data } = await $authHost.post('/api/products', product)
	return data
}

export const createBasketProduct = async (basketProduct) => {
	try {
		const response = await $host.post('/api/basketProducts', basketProduct)
		return response.data
	} catch (error) {
		console.error('Ошибка при создании продукта в корзине', error)
		throw error
	}
}

export const increaseBasketProductQuantity = async (basketId, productId) => {
	try {
		const response = await $host.put(
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

export const removeBasketProduct = async (basketId, productId) => {
	try {
		const response = await $host.delete(
			`/api/basketProducts/${basketId}/${productId}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при удалении товара из корзины', error)
		throw error
	}
}

export const fetchGenres = async () => {
	const { data } = await $host.get('/api/genres')
	return data
}

export const fetchAuthors = async () => {
	const { data } = await $host.get('/api/authors')
	return data
}

export const fetchCategories = async () => {
	const { data } = await $host.get('/api/categories')
	return data
}
export const createOrder = async (basketProductId, product) => {
	const { data } = await $host.post('api/orders', { basketProductId, product })
	return data
}

export const fetchOrders = async () => {
	const { data } = await $host.get('api/orders')
	return data
}
export const fetchProductVinyl = async (
	genreId,
	name,
	page,
	limit,
	minPrice,
	maxPrice
) => {
	const { data } = await $host.get('api/products', {
		params: {
			genreId,
			name,
			page,
			limit,
			minPrice,
			maxPrice,
		},
	})
	return data
}
export const fetchProduct = async () => {
	const { data } = await $host.get('/api/products')
	return data
}

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('/api/products/' + id)
	return data
}

export const fetchBasket = async () => {
	const { data } = await $host.get('/api/basketProducts')
	return data
}
