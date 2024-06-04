import React, { useState, useContext } from 'react'
import './Filter.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

// Компонент FilterCatalog обернут в observer для отслеживания изменений в MobX состоянии
const FilterCatalog = observer(() => {
	const { products } = useContext(Context) // Получение контекста с продуктами
	const [selectedGenre, setSelectedGenre] = useState(products.selectedGenres) // Локальное состояние для выбранного жанра
	const [minPrice, setMinPrice] = useState(products.minPrice) // Локальное состояние для минимальной цены
	const [maxPrice, setMaxPrice] = useState(products.maxPrice) // Локальное состояние для максимальной цены
	const [title, setTitle] = useState(products.title) // Локальное состояние для заголовка

	// Обработчик нажатия кнопки "Поиск"
	const handleFilter = () => {
		products.setMinPrice(minPrice) // Установка минимальной цены в состояние
		products.setMaxPrice(maxPrice) // Установка максимальной цены в состояние
		products.setSelectedGenres(selectedGenre) // Установка выбранного жанра в состояние
		products.setTitle(title) // Установка заголовка в состояние
	}

	// Обработчик выбора жанра
	const handleSelectGenre = (event) => {
		const selectedOption = event.target.value
		setSelectedGenre(selectedOption) // Обновление локального состояния выбранного жанра
	}

	// Обработчик изменения заголовка (поискового запроса)
	const handleTitleChange = (e) => {
		setTitle(e.target.value) // Обновление локального состояния заголовка
	}

	// Обработчик изменения цены
	const handlePriceChange = (setter) => (event) => {
		const value = event.target.value
		if (value === '' || /^[0-9\b]+$/.test(value)) {
			setter(value) // Обновление локального состояния цены, если значение пустое или является числом
		}
	}

	// Обработчик для предотвращения ввода некорректных символов в поле цены
	const handleKeyPress = (event) => {
		const charCode = event.charCode
		if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
			event.preventDefault() // Предотвращение ввода символов, кроме цифр и точки
		}
	}
	return (
		<section className='filter'>
			<ul className='filter-parameters'>
				<li className='filter-parameter-cells'>
					<p className='filter-parameter medium-title'>Альбом</p>
					<input
						className='input-custom-dark'
						type='text'
						placeholder='Альбом*'
						value={title}
						onChange={handleTitleChange}
					/>
				</li>
				<li className='filter-parameter-cells'>
					<p className='filter-parameter medium-title'>Цена</p>
					<div className='filter-price'>
						<input
							className='input-custom-dark'
							placeholder='ОТ*'
							value={minPrice}
							onChange={handlePriceChange(setMinPrice)}
							onKeyPress={handleKeyPress}
						/>
						<p>-</p>
						<input
							className='input-custom-dark'
							placeholder='ДО*'
							value={maxPrice}
							onChange={handlePriceChange(setMaxPrice)}
							onKeyPress={handleKeyPress}
						/>
					</div>
				</li>
				<li className='filter-parameter-cells'>
					<p className='filter-parameter medium-title'>Жанр</p>
					<ul className='filter-parameters'>
						<select
							id='genre'
							name='genre'
							className='select-custom'
							value={selectedGenre}
							onChange={handleSelectGenre}
						>
							<option className='option-custom' value=''>
								Выберите жанр
							</option>
							{products.genres.map((genre) => (
								<option key={genre.id} className='option' value={genre.id}>
									{genre.name}
								</option>
							))}
						</select>
					</ul>
				</li>
				<li className='filter-parameter-cells'>
					<button
						className='filter-button button-custom'
						onClick={handleFilter}
					>
						Поиск
					</button>
				</li>
			</ul>
		</section>
	)
})

export default FilterCatalog
