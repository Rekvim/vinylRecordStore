import React, { useContext, useEffect, useState } from 'react'
import '../css/Main.css'
import Pagination from '../components/Pagination/Pagination'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import New from '../components/News/New'
import { Context } from '../index'
import { fetchNews } from '../http/newAPI'
import { observer } from 'mobx-react-lite'

const News = observer(() => {
	const { products } = useContext(Context)
	const [loading, setLoading] = useState(true)

	// Загрузка новостей при монтировании компонента или изменении страницы
	useEffect(() => {
		fetchNews(products.page, 6).then((data) => {
			products.setNews(data.rows)
			products.setTotalCount(data.count)
		})
		setLoading(false)
	}, [products, products.page])
	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
	}
	return (
		<main className='container'>
			<section className='news'>
				{products.news.map((news) => (
					<New
						id={news.id}
						title={news.title}
						description={news.description}
						key={news.id}
					/>
				))}
			</section>
			<Pagination />
		</main>
	)
})

export default News
