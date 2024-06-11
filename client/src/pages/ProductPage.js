import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchOneProduct,
	fetchBasket,
	createBasketProduct,
	increaseBasketProductQuantity,
	createFavorite,
} from '../http/productAPI'
import { observer } from 'mobx-react-lite'
import '../css/Main.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from '../index'

const ProductPage = () => {
	const [product, setProduct] = useState({ info: [] })
	const [isAddingToBasket, setIsAddingToBasket] = useState(false)
	const [isAddingToFavorite, setIsAddingToFavorite] = useState(false) // Состояние для блокировки кнопки избранного
	const { id } = useParams()
	const { users } = useContext(Context)
	useEffect(() => {
		fetchOneProduct(id).then((data) => setProduct(data))
	}, [id])

	const handleAddToBasket = async () => {
		if (!isAddingToBasket) {
			setIsAddingToBasket(true)

			if (users.isAuth) {
				const token = localStorage.getItem('token')
				if (token) {
					try {
						if (users.usersId) {
							const basket = await fetchBasket(users.usersId)
							const basketProduct = basket.find(
								(p) => p.productId === parseInt(id)
							)

							if (basketProduct) {
								await increaseBasketProductQuantity(
									basketProduct.basketId,
									basketProduct.productId
								)
								toast.info('Количество товара увеличено.')
							} else {
								const basketProduct = {
									basketId: users.usersId,
									productId: id,
								}

								await createBasketProduct(basketProduct)
								users.setCartCount((prevCount) => prevCount + 1)

								toast.info('Товар добавлен в корзину.')
							}
						} else {
							toast.error('ID пользователя не найден в token')
						}
					} catch (error) {
						toast.error('Ошибка при обновлении корзины.')
					}
				} else {
					toast.error('token не найден')
				}
			} else {
				toast.error('Авторизуйтесь!')
			}

			setIsAddingToBasket(false)
		}
	}

	const handleAddToFavorite = async () => {
		if (!isAddingToFavorite) {
			setIsAddingToFavorite(true)

			if (users.isAuth) {
				const token = localStorage.getItem('token')
				if (token) {
					try {
						if (users.usersId) {
							await createFavorite(id, users.usersId)
							toast.info('Товар добавлен в избранное.')
						} else {
							toast.error('ID пользователя не найден в token')
						}
					} catch (error) {
						toast.error('Ошибка при добавлении в избранное.')
					}
				} else {
					toast.error('token не найден')
				}
			} else {
				toast.error('Авторизуйтесь!')
			}

			setIsAddingToFavorite(false)
		}
	}

	return (
		<main className='productPage-container container'>
			<div className='productPage'>
				<img
					className='productPage__img'
					src={product.image_url}
					alt='product'
				/>
				<div className='productPage-info'>
					<h2 className='productPage-name medium-title'>{product.name}</h2>
					<p className='productPage-author text'>{product.author}</p>
					{product.info.map((info) => (
						<p key={info.id} className='productPage-description text'>
							{info.title}: {info.description}
						</p>
					))}
					<button
						onClick={handleAddToBasket}
						className='productPage-button button-custom'
						disabled={isAddingToBasket}
					>
						{isAddingToBasket ? 'Добавляется...' : 'В корзину'}
					</button>
					<button
						onClick={handleAddToFavorite}
						className='productPage-button button-custom'
						disabled={isAddingToFavorite}
					>
						{isAddingToFavorite ? 'Добавляется...' : 'В избранное'}
					</button>
					<b className='productPage-price medium-title'>{product.price} руб.</b>
				</div>
			</div>
			<ToastContainer />
		</main>
	)
}

export default observer(ProductPage)
