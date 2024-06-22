import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { createProducts, fetchGenres } from '../../http/productAPI'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'

const CreateProducts = observer(({ isOpen, onClose }) => {
	const { products } = useContext(Context) // Инициализация контекста продукта
	const [name, setName] = useState('') // Состояние для хранения имени
	const [price, setPrice] = useState('') // Состояние для хранения цены
	const [imageUrl, setImageUrl] = useState('') // Состояние для хранения url
	const [info, setInfo] = useState([]) // Состояние для хранения массива информации

	useEffect(() => {
		// Прогрузка всех жанров
		fetchGenres().then((data) => products.setGenres(data))
	}, [products])

	// Добавление в массив новой информации
	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	// Удаление информации из массива
	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number))
	}
	// Информация об изменении
	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
	}
	// Функция создания продукта
	const addDevice = async () => {
		if (
			name.trim() === '' ||
			price === '' ||
			imageUrl.trim() === '' ||
			products.selectedGenres === ''
		) {
			toast.error('Пожалуйста, заполните все  поля')
			return
		}
		// Создаем переменную для хранения параметров продукта
		const productData = {
			name: name,
			price: price,
			genreId: products.selectedGenres,
			image_url: imageUrl,
			info: JSON.stringify(
				// Парсинг массива на переменные заголовка и описания
				info.map((i) => ({ title: i.title, description: i.description }))
			),
		}
		// Создаем продукт
		await createProducts(productData)
		toast.success('Продукт добавлен!')
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
