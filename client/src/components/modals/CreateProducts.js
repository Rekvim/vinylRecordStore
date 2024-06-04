import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { createProducts, fetchGenres } from '../../http/productAPI'
import { observer } from 'mobx-react-lite'

const CreateProducts = observer(({ isOpen, onClose }) => {
	const { products } = useContext(Context)
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [imageUrl, setImageUrl] = useState('')
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchGenres().then((data) => products.setGenres(data))
	}, [products])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const addDevice = async () => {
		if (!name || !price || !imageUrl || !products.selectedGenres) {
			alert('Please fill all required fields')
			return
		}

		const productData = {
			name: name,
			price: price,
			genreId: products.selectedGenres,
			image_url: imageUrl,
			info: JSON.stringify(
				info.map((i) => ({ title: i.title, description: i.description }))
			),
		}
		const response = await createProducts(productData)
		console.log('Продукт создан:', response)
		onClose() // Закрыть модальное окно после успешного создания новости
	}

	if (!isOpen) {
		return null
	}

	return (
		<section className='modal'>
			<div className='modal-content'>
				<h2 style={{ textAlign: 'center' }} className='big-title'>
					Добавить продукт
				</h2>

				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='input-custom-dark'
					placeholder='Введите название устройства'
				/>
				<input
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
					className='input-custom-dark'
					placeholder='Введите стоимость устройства'
				/>
				<div className='modal-params'>
					<select
						className='select-custom'
						defaultValue=''
						onChange={(e) => products.setSelectedGenres(e.target.value)}
					>
						<option value='' disabled>
							Выберите жанр
						</option>
						{products.genres.length > 0 &&
							products.genres.map((genre) => (
								<option
									className='option-custom'
									value={genre.id}
									key={genre.id}
								>
									{genre.name}
								</option>
							))}
					</select>

					<input
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						className='input-custom-dark'
						placeholder='Введите url картинки'
					/>
					<hr />
					<button className='button-custom' onClick={addInfo}>
						Добавить новое свойство
					</button>
					{info.map((i) => (
						<div className='modal-dop-params' key={i.number}>
							<input
								value={i.title}
								className='input-custom-dark'
								onChange={(e) => changeInfo('title', e.target.value, i.number)}
								placeholder='Введите название заголовок'
							/>
							<input
								value={i.description}
								className='input-custom-dark'
								onChange={(e) =>
									changeInfo('description', e.target.value, i.number)
								}
								placeholder='Введите описание'
							/>
							<button
								className='button-custom'
								onClick={() => removeInfo(i.number)}
							>
								Удалить
							</button>
						</div>
					))}
				</div>
				<div className='modal-footer'>
					<button className='button-custom' onClick={onClose}>
						Закрыть
					</button>
					<button className='button-custom' onClick={addDevice}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
})

export default CreateProducts
