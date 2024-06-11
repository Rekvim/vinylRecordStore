import React from 'react'
import { NavLink } from 'react-router-dom'

const FavoriteProduct = ({ product, productDetails, onRemove }) => {
	return (
		<NavLink to={'/product/' + productDetails.id} className='product'>
			<img
				className='product-img'
				src={productDetails.image_url}
				alt={productDetails.name}
			/>
			<div>
				<p className='product-title medium-title'>{productDetails.name}</p>
				<p className='product-title medium-title'>
					{productDetails.price} руб.
				</p>
				<button
					className='button-custom'
					onClick={(e) => {
						e.preventDefault() // Предотвращение перехода при клике на кнопку
						onRemove(product.productId)
					}}
				>
					Удалить
				</button>
			</div>
		</NavLink>
	)
}

export default FavoriteProduct
