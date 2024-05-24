import React, { useState } from 'react'
import { createAuthors } from '../../http/productAPI'

const CreateAuthors = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addAuthor = () => {
		createAuthors({ name: value }).then((data) => {
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
					Добавить автора
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите автора'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={onClose}>
						Закрыть
					</button>
					<button className='button-custom' onClick={addAuthor}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateAuthors
