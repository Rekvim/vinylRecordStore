import { makeAutoObservable } from 'mobx'

class ProductStore {
	constructor() {
		this._products = []
		this._genres = []
		this._news = []
		this._selectedGenres = null
		this._page = 1
		this._totalCount = 0
		this._limit = 6
		this._title = ''
		this._minPrice = null
		this._maxPrice = null
		makeAutoObservable(this)
	}

	setProducts(products) {
		this._products = products
	}

	setGenres(genres) {
		this._genres = genres
	}

	setSelectedGenres(genre) {
		this._selectedGenres = genre
	}

	setPage(page) {
		this._page = page
	}

	setTotalCount(count) {
		this._totalCount = count
	}

	setTitle(title) {
		this._title = title
	}

	setMinPrice(minPrice) {
		this._minPrice = minPrice
	}

	setMaxPrice(maxPrice) {
		this._maxPrice = maxPrice
	}
	setNews(news) {
		this._news = news
	}
	get products() {
		return this._products
	}

	get genres() {
		return this._genres
	}

	get selectedGenres() {
		return this._selectedGenres
	}

	get page() {
		return this._page
	}

	get totalCount() {
		return this._totalCount
	}

	get title() {
		return this._title
	}

	get minPrice() {
		return this._minPrice
	}

	get maxPrice() {
		return this._maxPrice
	}
	get news() {
		return this._news
	}
}

export default ProductStore
