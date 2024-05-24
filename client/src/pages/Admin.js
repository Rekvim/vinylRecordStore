import React, { useState } from 'react'

import CreateGenres from '../components/modals/CreateGenres'
import CreateProducts from '../components/modals/CreateProducts'
import CreateAuthors from '../components/modals/CreateAuthors'
import CreateNew from '../components/modals/CreateNew'

const Admin = () => {
	const [genreVisible, setGenreVisible] = useState(false)
	const [authorVisible, setAuthorVisible] = useState(false)
	const [productVisible, setProductVisible] = useState(false)
	const [newVisible, setNewVisible] = useState(false)

	const openGenreModal = () => {
		setGenreVisible(true)
		setAuthorVisible(false)
		setProductVisible(false)
		setNewVisible(false)
	}

	const openAuthorModal = () => {
		setGenreVisible(false)
		setAuthorVisible(true)
		setProductVisible(false)
		setNewVisible(false)
	}

	const openProductModal = () => {
		setGenreVisible(false)
		setAuthorVisible(false)
		setProductVisible(true)
		setNewVisible(false)
	}
	const openNewModal = () => {
		setGenreVisible(false)
		setAuthorVisible(false)
		setProductVisible(false)
		setNewVisible(true)
	}

	const closeModal = () => {
		setGenreVisible(false)
		setAuthorVisible(false)
		setProductVisible(false)
		setNewVisible(false)
	}

	return (
		<main className='main container'>
			<button className='button-custom' onClick={openAuthorModal}>
				Добавить автора
			</button>
			<button className='button-custom' onClick={openGenreModal}>
				Добавить жанр
			</button>
			<button className='button-custom' onClick={openProductModal}>
				Добавить продукт
			</button>
			<button className='button-custom' onClick={openNewModal}>
				Добавить новость
			</button>
			<CreateGenres isOpen={genreVisible} onClose={closeModal} />
			<CreateProducts isOpen={productVisible} onClose={closeModal} />
			<CreateAuthors isOpen={authorVisible} onClose={closeModal} />
			<CreateNew isOpen={newVisible} onClose={closeModal} />
		</main>
	)
}

export default Admin
