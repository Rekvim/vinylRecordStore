import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'

import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI'
import { Context } from './index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = observer(() => {
	const { users } = useContext(Context) // Контекст пользователя
	const [loading, setLoading] = useState(true) // Состояние загрузки страницы

	useEffect(() => {
		check()
			.then((data) => {
				users.setUsers(true)
				users.setIsAuth(true)
			}) // Если токен сохранен, то остается авторизированным
			.catch((error) => {
				console.error('Ошибка при проверке пользователя:', error)
			})
			.finally(() => setLoading(false))
	}, [users])

	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter /> {/* Прогрузка страниц */}
			<Footer />
			<ToastContainer /> {/* Блок для всплывающих сообщений */}
		</BrowserRouter>
	)
})

export default App
