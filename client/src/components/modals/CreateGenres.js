import React, { useState } from 'react'
import { createGenres } from '../../http/productAPI'

const CreateGenre = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addGenre = () => {
		createGenres({ name: value }).then((data) => {
			setValue('')
			onClose()
		})
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
