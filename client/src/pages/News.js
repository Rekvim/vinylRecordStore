import React, { useContext, useEffect } from 'react'
import '../css/Main.css'
import Pagination from '../components/Pagination/Pagination'
import New from '../components/News/New'
import { Context } from '../index'
import { fetchNews } from '../http/newAPI'
import { observer } from 'mobx-react-lite'

const News = observer(() => {
	const { products } = useContext(Context)

	useEffect(() => {
		fetchNews(products.page, 6).then((data) => {
			products.setNews(data.rows)
			products.setTotalCount(data.count)
		})
	}, [products])

	useEffect(() => {
		fetchNews(products.page, 6).then((data) => {
			products.setNews(data.rows)
			products.setTotalCount(data.count)
		})
	}, [products.page, products]) // Remove products from dependencies

	return (
		<main className='container'>
			<div></div>
			<section className='news'>
				{products.news.map((news) => (
					<New
						id={news.id}
						title={news.title}
						description={news.description}
						key={news.id}
					/>
				))}
				<Pagination />
			</section>
		</main>
	)
})

export default News
