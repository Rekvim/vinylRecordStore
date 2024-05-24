import React, { useEffect, useState } from 'react'
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

const ProductPage = () => {
	const [product, setProduct] = useState({ info: [] })
	const { id } = useParams()

	useEffect(() => {
		fetchOneProduct(id).then((data) => setProduct(data))
	}, [id])

	const handleAddToBasket = async () => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const decodedToken = jwtDecode(token)
				const userId = decodedToken.id // предположим, что ID пользователя хранится в поле `id` токена

				if (userId) {
					const basket = await fetchBasket()
					const basketProduct = basket.find((p) => p.productId === parseInt(id))

					if (basketProduct) {
						// Продукт уже в корзине, увеличиваем количество
						await increaseBasketProductQuantity(
							basketProduct.basketId,
							basketProduct.productId
						)
						toast.info('Количество товара увеличено.')
					} else {
						// Продукта нет в корзине, добавляем
						await createBasketProduct({ basketId: userId, productId: id })
						toast.info('Товар добавлен в корзину.')
					}
				} else {
					console.error('ID пользователя не найден в токене')
					toast.error('ID пользователя не найден в токене')
				}
			} catch (error) {
				console.error('Ошибка при обновлении корзины:', error)
				toast.error('Ошибка при обновлении корзины.')
			}
		} else {
			console.error('Токен не найден')
			toast.error('Токен не найден')
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
					>
						В корзину
					</button>
					<b className='productPage-price medium-title'>{product.price} руб.</b>
				</div>
			</div>
			<ToastContainer />
		</main>
	)
}

export default observer(ProductPage)
