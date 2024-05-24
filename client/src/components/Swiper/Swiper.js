import React, { useState } from 'react'
import './Swiper.css'
import '../../css/Main.css'
import Product from '../Product/Product'

const Swiper = ({ items, itemsPerPage }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex - itemsPerPage < 0 ? 0 : prevIndex - itemsPerPage
		)
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex + itemsPerPage >= items.length
				? prevIndex
				: prevIndex + itemsPerPage
		)
	}

	const renderItems = () => {
		if (!Array.isArray(items)) {
			return <div>Ошибка: данные не являются массивом</div>
		}

		return items
			.slice(currentIndex, currentIndex + itemsPerPage)
			.map((item, index) => (
				<div className='carousel-item' key={index}>
					<Product {...item} />
				</div>
			))
	}

	return (
		<div className='carousel'>
			<button className='carousel-button prev' onClick={handlePrev}>
				&#9664;
			</button>
			<div className='carousel-content'>{renderItems()}</div>
			<button className='carousel-button next' onClick={handleNext}>
				&#9654;
			</button>
		</div>
	)
}

export default Swiper
