import React from 'react'
import { NavLink } from 'react-router-dom'
import './SearchBar.css'

const SmallProductCard = ({ product }) => {
	return (
		<NavLink
			to={'/product/' + product.id}
			className='search-result-item'
			key={product.id}
		>
			<img
				src={product.image_url}
				alt={product.name}
				className='search-result-image'
			/>
			<div className='search-result-details'>
				<p className='search-result-name'>{product.name}</p>
				<p className='search-result-price'>{product.price} руб.</p>
			</div>
		</NavLink>
	)
}

export default SmallProductCard
