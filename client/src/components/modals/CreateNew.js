import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { createNews } from '../../http/newAPI'

const CreateProducts = observer(({ isOpen, onClose }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newDescription, setNewDescription] = useState('')
	const [info, setInfo] = useState([])

	const addInfo = () => {
		setInfo([
			...info,
			{
				title: 'Default Title',
				description: 'Default Description',
				number: Date.now(),
			},
		])
	}

	const removeInfo = (number) => {
		setInfo(info.filter((i) => i.number !== number))
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const addNew = async () => {
		try {
			const newsData = {
				title: newTitle,
				description: newDescription,
				info: JSON.stringify(
					info.map((i) => ({ title: i.title, description: i.description }))
				),
			}
			const response = await createNews(newsData)
			console.log('Новость создана:', response)
			onClose() // Закрыть модальное окно после успешного создания новости
		} catch (error) {
			console.error('Ошибка при создании новости:', error)
		}
	}

	if (!isOpen) {
		return null
	}

	return (
		<section className='modal'>
			<div className='modal-content'>
				<h2 style={{ textAlign: 'center' }} className='big-title'>
					Добавить новость
				</h2>
				<input
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					className='input-custom-dark'
					placeholder='Введите заголовок'
				/>
				<input
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
					className='input-custom-dark'
					placeholder='Введите описание'
				/>
				<div className='modal-params'>
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
					<button className='button-custom' onClick={addNew}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
})

export default CreateProducts
