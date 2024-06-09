import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../index'
import './SearchBar.css'
import { NavLink } from 'react-router-dom'
import useDebounce from './useDebounce'
import { fetchProductVinyl } from '../../http/productAPI'

const SearchBar = () => {
	const { products } = useContext(Context) // Получаем контекст с продуктами
	const [title, setTitle] = useState('') // Состояние для ввода текста поиска
	const [localProducts, setLocalProducts] = useState([]) // Локальное состояние для продуктов, отображаемых в результатах поиска
	const debouncedSearchTerm = useDebounce(title, 300) // Задержка для текста поиска на 300 мс

	// Обновляем title в products, когда изменяется debouncedSearchTerm
	useEffect(() => {
		if (debouncedSearchTerm) {
			products.setTitle(debouncedSearchTerm)
		}
	}, [debouncedSearchTerm, products])

	// Эффект для выполнения запроса на сервер при изменении debouncedSearchTerm или других зависимостей
	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchProductVinyl(
				products.selectedGenres,
				debouncedSearchTerm,
				products.minPrice,
				products.maxPrice,
				products.page,
				products.limit
			).then((data) => {
				setLocalProducts(data.rows) // Обновление локального состояния продуктами, полученными с сервера
			})
		} else {
			setLocalProducts([]) // Очистка локального состояния, если строка поиска пустая
		}
	}, [
		products.selectedGenres,
		products.minPrice,
		products.maxPrice,
		products.page,
		debouncedSearchTerm,
		products.limit,
	])

	// Обработчик для применения фильтра
	const handleFilter = () => {
		products.setTitle(debouncedSearchTerm)
	}

	// Обработчик для изменения состояния title при вводе текста
	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}
	return (
		<div className='search-bar'>
			<div className='search-input'>
				<NavLink to='/catalog' onClick={handleFilter}>
					<svg
						width='30'
						height='31'
						viewBox='0 0 30 31'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g clipPath='url(#clip0_393_949)'>
							<path
								d='M12.6856 24.9753C19.1 24.9753 24.2999 19.7754 24.2999 13.361C24.2999 6.9466 19.1 1.7467 12.6856 1.7467C6.27118 1.7467 1.07129 6.9466 1.07129 13.361C1.07129 19.7754 6.27118 24.9753 12.6856 24.9753Z'
								stroke='#000001'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M28.9283 29.6038L20.8926 21.5681'
								stroke='#000001'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</g>
						<defs>
							<clipPath id='clip0_393_949'>
								<rect
									width='30'
									height='30'
									fill='white'
									transform='translate(0 0.675293)'
								/>
							</clipPath>
						</defs>
					</svg>
				</NavLink>
				<input
					type='text'
					placeholder='Поиск...'
					value={title}
					onChange={handleTitleChange}
					className='input-custom-dark'
				/>
			</div>

			{localProducts.length > 0 && (
				<div className='search-results'>
					{localProducts.map(
						(
							product // Используем локальное состояние
						) => (
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
					)}
				</div>
			)}
		</div>
	)
}

export default SearchBar
