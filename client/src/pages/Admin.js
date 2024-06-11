import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // исправлено имя импорта

import CreateGenres from '../components/modals/CreateGenres'
import CreateProducts from '../components/modals/CreateProducts'
import CreateAuthors from '../components/modals/CreateAuthors'
import CreateNew from '../components/modals/CreateNew'

const Admin = () => {
	const [isAdmin, setIsAdmin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					console.error('Token not found')
					setIsAdmin(false)
					setLoading(false)
					return
				}

				const decodedToken = jwtDecode(token)
				console.log('Decoded token:', decodedToken) // отладочное сообщение
				const roleId = decodedToken.roleId

				if (roleId === 2) {
					setIsAdmin(true)
				} else {
					setIsAdmin(false)
				}
			} catch (error) {
				console.error('Failed to fetch user info:', error)
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
		return <div>Loading...</div> // индикатор загрузки
	}

	if (!isAdmin) {
		return <Navigate to='/' />
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
