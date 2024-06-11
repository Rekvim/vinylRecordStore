import React from 'react'
import '../../css/Main.css'
import {
	removeBasketProduct,
	increaseBasketProductQuantity,
	decreaseBasketProductQuantity,
} from '../../http/productAPI'
import { NavLink } from 'react-router-dom'

const BasketProduct = ({ product, productDetails, onRemove, onUpdate }) => {
	const handleIncreaseQuantity = async () => {
		// Функция увелечения количества продукта
		try {
			const updatedProduct = await increaseBasketProductQuantity(
				product.basketId,
				product.productId
			)
			onUpdate(updatedProduct)
		} catch (error) {
			console.error('Ошибка при увеличении количества товара', error)
		}
	}

	const handleDecreaseQuantity = async () => {
		// Если продуктов больше 1, происходит уменьшение количества, иначе товар удалится
		if (product.quantity > 1) {
			try {
				const updatedProduct = await decreaseBasketProductQuantity(
					product.basketId,
					product.productId
				)
				onUpdate(updatedProduct)
			} catch (error) {
				console.error('Ошибка при уменьшении количества товара', error)
			}
		} else {
			try {
				await removeBasketProduct(product.basketId, product.productId)
				onRemove(product.productId)
			} catch (error) {
				console.error('Ошибка при удалении товара из корзины', error)
			}
		}
	}

	if (!productDetails) {
		return <div className='card-product'>Загрузка...</div>
	}

	return (
		<div to={'/product/' + productDetails.id} className='card-product'>
			<div className='card-product-left-bar'>
				<img
					className='card-product-img'
					src={productDetails.image_url}
					alt={productDetails.name}
				/>
				<div className='card-product-info'>
					<h2 className='card-product-name text'>{productDetails.name}</h2>
				</div>
			</div>
			<div className='card-product-right-bar'>
				<span
					className='card-kol medium-title'
					onClick={handleDecreaseQuantity}
				>
					-
				</span>
				<p className='medium-title'>{product.quantity}</p>
				<span
					className='card-kol medium-title'
					onClick={handleIncreaseQuantity}
				>
					+
				</span>
				<p className='card-price medium-title'>
					{productDetails.price * product.quantity} руб.
				</p>
			</div>
		</div>
	)
}

export default BasketProduct
