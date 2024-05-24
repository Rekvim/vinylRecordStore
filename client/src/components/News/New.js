import React from 'react'
import { NavLink } from 'react-router-dom'
import './New.css'

const News = (props) => {
	return (
		<div className='new'>
			<div className='new-info'>
				<h3 className='new-title medium-title'>{props.title}</h3>
				<p className='new-text text'>{props.description}</p>
			</div>
			<NavLink to={'/news/' + props.id} className='new-button button-custom'>
				Перейти
			</NavLink>
		</div>
	)
}

export default News
