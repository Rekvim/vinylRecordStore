import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneNews } from '../http/newAPI'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

import '../css/Main.css'

const NewPage = () => {
	const [news, setNew] = useState({ info: [] })
	const [loading, setLoading] = useState(true)

	const { id } = useParams()

	// Загрузка одной новости по id при монтировании компонента или изменении id
	useEffect(() => {
		fetchOneNews(id).then((data) => setNew(data))
		setLoading(false)
	}, [id])

	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
	}
	return (
		<main class='main container'>
			{news.info.map((info) => (
				<h2 key={info.id} className='productPage-description  medium-title'>
					{info.title}
				</h2>
			))}
			{news.info.map((info) => (
				<p key={info.id} className='productPage-description text'>
					{info.description}
				</p>
			))}
		</main>
	)
}

export default NewPage
