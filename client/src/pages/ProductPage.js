import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchOneProduct,
	fetchBasket,
	createBasketProduct,
	increaseBasketProductQuantity,
} from '../http/productAPI'
import { observer } from 'mobx-react-lite'
import { jwtDecode } from 'jwt-decode'
import '../css/Main.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from '../index'

const ProductPage = () => {
	const [product, setProduct] = useState({ info: [] })
	const [isAddingToBasket, setIsAddingToBasket] = useState(false) // Состояние для блокировки кнопки
	const { id } = useParams()
	const { users } = useContext(Context)

	useEffect(() => {
		fetchOneProduct(id).then((data) => setProduct(data))
	}, [id])

	const handleAddToBasket = async () => {
		if (!isAddingToBasket) {
			// Проверяем, не добавляется ли товар уже
			setIsAddingToBasket(true) // Блокируем кнопку

			if (users.isAuth) {
				const token = localStorage.getItem('token')
				if (token) {
					try {
						const decodedToken = jwtDecode(token)
						const userId = decodedToken.id

						if (userId) {
							const basket = await fetchBasket()
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
								await createBasketProduct({ basketId: userId, productId: id })
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

			setIsAddingToBasket(false) // Разблокируем кнопку после выполнения операции
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
						disabled={isAddingToBasket} // Блокируем кнопку при добавлении в корзину
					>
						{isAddingToBasket ? 'Добавляется...' : 'В корзину'}
					</button>
					<b className='productPage-price medium-title'>{product.price} руб.</b>
				</div>
			</div>
			<ToastContainer />
		</main>
	)
}

export default observer(ProductPage)
