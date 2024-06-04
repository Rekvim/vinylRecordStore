import React, { useState } from 'react'
import './Swiper.css'
import '../../css/Main.css'
import Product from '../Product/Product'

const Swiper = ({ items, itemsPerPage }) => {
	const [currentIndex, setCurrentIndex] = useState(0) // Состояние для текущего индекса элемента

	// Обработчик для переключения на предыдущий слайд
	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex - itemsPerPage < 0 ? 0 : prevIndex - itemsPerPage
		)
	}

	// Обработчик для переключения на следующий слайд
	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex + itemsPerPage >= items.length
				? prevIndex
				: prevIndex + itemsPerPage
		)
	}

	// Функция для отображения элементов в текущем слайде
	const renderItems = () => {
		if (!Array.isArray(items)) {
			return <div>Ошибка: данные не являются массивом</div> // Вывод сообщения об ошибке, если данные не являются массивом
		}

		return items
			.slice(currentIndex, currentIndex + itemsPerPage) // Получение подмассива текущих элементов
			.map(
				(
					item,
					index // Отображение каждого элемента в виде компонента Product
				) => (
					// Передача свойств элемента в компонент
					<div className='carousel-item' key={index}>
						<Product {...item} />
						Product
					</div>
				)
			)
	}

	return (
		<div className='carousel'>
			<button className='carousel-button prev' onClick={handlePrev}>
				&#9664; {/* Стрелка влево */}
			</button>
			<div className='carousel-content'>{renderItems()}</div>
			<button className='carousel-button next' onClick={handleNext}>
				&#9654; {/* Стрелка вправо */}
			</button>
		</div>
	)
}

export default Swiper
