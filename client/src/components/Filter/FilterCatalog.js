import React, { useState, useContext } from 'react'
import './Filter.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

const FilterCatalog = observer(() => {
	const { products } = useContext(Context)
	const [selectedGenre, setSelectedGenre] = useState(products.selectedGenres)
	const [minPrice, setMinPrice] = useState(products.minPrice)
	const [maxPrice, setMaxPrice] = useState(products.maxPrice)
	const [title, setTitle] = useState(products.title)

	const handleFilter = () => {
		products.setMinPrice(minPrice)
		products.setMaxPrice(maxPrice)
		products.setSelectedGenres(selectedGenre)
		products.setTitle(title)
	}

	const handleSelectGenre = (event) => {
		const selectedOption = event.target.value
		setSelectedGenre(selectedOption)
	}

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const handlePriceChange = (setter) => (event) => {
		const value = event.target.value
		if (value === '' || /^[0-9\b]+$/.test(value)) {
			setter(value)
		}
	}

	const handleKeyPress = (event) => {
		const charCode = event.charCode
		if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
			event.preventDefault()
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
