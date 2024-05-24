import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/Main.css'

const Product = (props) => {
	return (
		<NavLink to={'product/' + props.id} className='product'>
			<img className='product-img' src={props.image_url} alt='product' />
			<p className='product-title medium-title'>{props.name}</p>
			{/* <span className='product-author text'>{props.author}</span> */}
			<p className='product-price text'>{props.price}</p>
		</NavLink>
	)
}

export default Product
