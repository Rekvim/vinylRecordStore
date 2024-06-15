import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import CreateGenres from '../components/modals/CreateGenres'
import CreateProducts from '../components/modals/CreateProducts'
import CreateAuthors from '../components/modals/CreateAuthors'
import CreateNew from '../components/modals/CreateNew'

const Admin = () => {
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true) // Состояние загрузки страницы

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					console.error('Токен не обнаружен')
					setIsAdmin(false)
					setLoading(false)
					return
				}

				const decodedToken = jwtDecode(token)
				const roleId = decodedToken.roleId

				if (roleId === 2) {
					setIsAdmin(true)
				} else {
					setIsAdmin(false)
				}
			} catch (error) {
				setIsAdmin(false)
			} finally {
				setLoading(false)
			}
		}

		fetchUserInfo()
	}, [])

	const [modalVisible, setModalVisible] = useState(null)

	const openModal = (modalName) => {
		setModalVisible(modalName)
	}

	const closeModal = () => {
		setModalVisible(null)
	}

	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
	}

	if (!isAdmin) {
		return <Navigate to='/' />
	}

	return (
		<main className='main container'>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
			</div>

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
