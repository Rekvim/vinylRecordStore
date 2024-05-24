import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI'
import { Context } from './index'

const App = observer(() => {
	const { users } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then((data) => {
				users.setUsers(true)
				users.setIsAuth(true)
			})
			.catch((error) => {
				console.error('Ошибка при проверке пользователя:', error)
			})
			.finally(() => setLoading(false))
	}, [users])

	if (loading) {
		return <div>Загрузка</div>
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
			<Footer />
		</BrowserRouter>
	)
})

export default App
