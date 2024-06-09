import React from 'react'

const FavouriteProduct = ({ product, productDetails, onRemove }) => {
	return (
		<div className='favourite-product-item'>
			<img src={productDetails.image_url} alt={productDetails.name} />
			<div>
				<h3>{productDetails.name}</h3>
				<p>{productDetails.price} руб.</p>
				<button onClick={() => onRemove(product.productId)}>Remove</button>
			</div>
		</div>
	)
}

export default FavouriteProduct
