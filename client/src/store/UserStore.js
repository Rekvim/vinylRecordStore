import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._users = {}
		this._cartCount = 0
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}
	setUsers(users) {
		this._users = users
	}

	get isAuth() {
		return this._isAuth
	}

	get users() {
		return this._users
	}
	setCartCount(count) {
		this._cartCount = count
	}

	incrementCartCount() {
		this._cartCount += 1
	}

	decrementCartCount() {
		if (this.cartCount > 0) {
			this._cartCount -= 1
		}
	}
}
