import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchOneProduct,
	fetchBasket,
	createBasketProduct,
	increaseBasketProductQuantity,
	createFavorite,
	fetchFavorites,
} from '../http/productAPI'

import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import { observer } from 'mobx-react-lite'
import '../css/Main.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from '../index'

const ProductPage = () => {
	const { users } = useContext(Context) // Получение контекста пользователя
	const [product, setProduct] = useState({ info: [] }) // Массив хранения информации о продукте
	const [isAddingToBasket, setIsAddingToBasket] = useState(false) // Состояние для блокировки кнопки добавления, до тех пор пока не пройдет запрос
	const [isAddingToFavorite, setIsAddingToFavorite] = useState(false) // Состояние для блокировки кнопки избранного, до тех пор пока не пройдет запрос

	const [loading, setLoading] = useState(true) // Состояние загрузки страницы

	const { id } = useParams() // Получение id из url
	// Загрузка данных продукта по id
	useEffect(() => {
		fetchOneProduct(id).then((data) => setProduct(data))
		setLoading(false)
	}, [id])
	// Добавление или увеличение количества продукта в корзине
	const handleAddToBasket = async () => {
		if (!isAddingToBasket) {
			setIsAddingToBasket(true)
			// Проверка на авторизация
			if (users.isAuth) {
				const token = localStorage.getItem('token')
				// Проверка токена
				if (token) {
					try {
						if (users.usersId) {
							// Поиск товара в корзине
							const basket = await fetchBasket(users.usersId)
							const basketProduct = basket.find(
								(p) => p.productId === parseInt(id)
							)
							// Если товар в корзине есть, увеличиваем его количество
							if (basketProduct) {
								await increaseBasketProductQuantity(
									basketProduct.basketId,
									basketProduct.productId
								)
								toast.success('Количество товара увеличено.')
							} else {
								// Иначе добавляем его в корзину
								const basketProduct = {
									// Запись параметров в переменную
									basketId: users.usersId,
									productId: id,
								}
								// Создание подукта в корзине
								await createBasketProduct(basketProduct)
								// Увеличение количества товаров к счетчике товаров корзины
								users.setCartCount(users.cartCount + 1)
								// Вывод сообщения
								toast.success('Товар добавлен в корзину.')
							}
						} else {
							// Вывод сообщения
							toast.error('ID пользователя не найден в token')
						}
					} catch (error) {
						// Вывод сообщения
						toast.error('Ошибка при обновлении корзины.')
					}
				} else {
					// Вывод сообщения
					toast.error('token не найден')
				}
			} else {
				// Вывод сообщения
				toast.error('Авторизуйтесь!')
			}
			setIsAddingToBasket(false) // Обновление состояние блокировки кнопки
		}
	}
	// Добавление продукта в избранное
	const handleAddToFavorite = async () => {
		if (!isAddingToFavorite) {
			setIsAddingToFavorite(true)
			if (users.isAuth) {
				// Проверка авторизации
				const token = localStorage.getItem('token')
				if (token) {
					// Проверка токена
					try {
						// Проверка есть ли такой пользователь
						if (users.usersId) {
							// Проверка есть ли такой товар в фаворитах
							const favorite = await fetchFavorites(users.usersId)
							const favoriteProduct = favorite.find(
								(p) => p.productId === parseInt(id)
							)
							// Если товар есть, то выводим сообщение
							if (favoriteProduct) {
								toast.error('Товар уже в избранном.')
								setIsAddingToFavorite(false)
								return
							}
							// Создание фаворитов
							await createFavorite(id, users.usersId)
							// Вывод сообщения
							toast.success('Товар добавлен в избранное.')
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
	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
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

					<div style={{ display: 'flex', alignItems: 'center', gap: '15px	' }}>
						<button
							onClick={handleAddToBasket}
							className='productPage-button button-custom'
							disabled={isAddingToBasket}
						>
							{isAddingToBasket ? 'Добавляется' : 'В корзину'}
						</button>
						<svg
							className='card-icon header-icon'
							disabled={isAddingToFavorite}
							onClick={handleAddToFavorite}
							width='30'
							height='25'
							viewBox='0 0 25 25'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<g clipPath='url(#clip0_1_15)'>
								<path
									className='icon-background'
									d='M12.501 3.16119C15.4372 0.524988 19.9746 0.612487 22.8033 3.44618C25.6308 6.28113 25.7283 10.796 23.0983 13.741L12.4985 24.3558L1.90122 13.741C-0.728729 10.796 -0.62998 6.27363 2.19622 3.44618C5.02741 0.616237 9.55608 0.521238 12.501 3.16119ZM21.0334 5.2124C19.1584 3.33494 16.1335 3.25869 14.171 5.02115L12.5023 6.51863L10.8323 5.0224C8.86359 3.25744 5.8449 3.33494 3.96493 5.2149C2.10247 7.07737 2.00872 10.0586 3.72494 12.0285L12.4998 20.8171L21.2746 12.0298C22.9921 10.0586 22.8983 7.08112 21.0334 5.2124Z'
									fill='rgba(45, 45, 45, 0.6)'
								/>
							</g>
							<defs>
								<clipPath id='clip0_1_15'>
									<rect width='25' height='25' fill='white' />
								</clipPath>
							</defs>
						</svg>

						<b className='productPage-price medium-title'>
							{product.price} руб.
						</b>
					</div>
				</div>
			</div>
		</main>
	)
}

export default observer(ProductPage)
