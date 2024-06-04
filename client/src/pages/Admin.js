import React, { useState } from 'react'

import CreateGenres from '../components/modals/CreateGenres'
import CreateProducts from '../components/modals/CreateProducts'
import CreateAuthors from '../components/modals/CreateAuthors'
import CreateNew from '../components/modals/CreateNew'

const Admin = () => {
	const [modalVisible, setModalVisible] = useState(null)

	const openModal = (modalName) => {
		setModalVisible(modalName)
	}

	const closeModal = () => {
		setModalVisible(null)
	}

	return (
		<main className='main container'>
			<button className='button-custom' onClick={() => openModal('authors')}>
				Добавить автора
			</button>
			<button className='button-custom' onClick={() => openModal('genres')}>
				Добавить жанр
			</button>
			<button className='button-custom' onClick={() => openModal('products')}>
				Добавить продукт
			</button>
			<button className='button-custom' onClick={() => openModal('news')}>
				Добавить новость
			</button>
			{modalVisible === 'authors' && (
				<CreateAuthors isOpen={true} onClose={closeModal} />
			)}
			{modalVisible === 'genres' && (
				<CreateGenres isOpen={true} onClose={closeModal} />
			)}
			{modalVisible === 'products' && (
				<CreateProducts isOpen={true} onClose={closeModal} />
			)}
			{modalVisible === 'news' && (
				<CreateNew isOpen={true} onClose={closeModal} />
			)}
		</main>
	)
}

export default Admin
