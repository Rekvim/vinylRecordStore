import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { fetchOneNews } from '../http/newAPI'
import '../css/Main.css'

const NewPage = () => {
	const [news, setNew] = useState({ info: [] })
	const { id } = useParams()
	useEffect(() => {
		fetchOneNews(id).then((data) => setNew(data))
	}, [id])
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
