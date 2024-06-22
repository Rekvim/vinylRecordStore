import React, { useState } from 'react'
import { createGenres } from '../../http/productAPI'
import { toast } from 'react-toastify'

const CreateGenre = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('') // Состояние для хранения названия

	const addGenre = () => {
		if (value.trim() === '') {
			toast.error('Поле названия пустое')
			return
		}
		// Создание жанра
		createGenres({ name: value }).then((data) => {
			setValue('') // Очищаем состояние
			onClose() // Закрываем окно
		})
		toast.success('Жанр создан!') // Сообщение
	}
	if (!isOpen) {
		return null
	}

	return (
		<section className='modal'>
			<div className='modal-content'>
				<h2 style={{ textAlign: 'center' }} className='big-title'>
					Добавить жанр
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите жанр'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={onClose}>
						Закрыть
					</button>
					<button className='button-custom' onClick={addGenre}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateGenre
