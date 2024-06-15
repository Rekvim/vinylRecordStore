import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import Product from '../components/Product/Product'
import Filter from '../components/Filter/FilterCatalog'
import { observer } from 'mobx-react-lite'
import { fetchGenres, fetchProduct } from '../http/productAPI'
import Pagination from '../components/Pagination/Pagination'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

const Catalog = observer(() => {
	const { products } = useContext(Context) // Получение контекста с продуктами
	const [loading, setLoading] = useState(true) // Состояние загрузки страницы

	// Эффект для получения жанров при загрузке компонента
	useEffect(() => {
		fetchGenres().then((data) => products.setGenres(data))
	}, [products])

	// Эффект для получения продуктов при изменении фильтров и параметров пагинации
	useEffect(() => {
		fetchProduct(
			// Зависимости прописанные в контексте продукта, по которым проходит фильтрация
			products.selectedGenres,
			products.title,
			products.minPrice,
			products.maxPrice,
			products.page,
			products.limit
		).then((data) => {
			products.setProducts(data.rows)
			products.setTotalCount(data.count)
		})
		setLoading(false)
	}, [
		// Зависимости прописанные в контексте продукта
		products.selectedGenres, // Зависимость от выбранных жанров
		products.title, // Зависимость от заголовка (поискового запроса)
		products.minPrice, // Зависимость от минимальной цены
		products.maxPrice, // Зависимость от максимальной цены
		products.page, // Зависимость от текущей страницы
		products, // Добавлено products для обеспечения зависимости
	])
	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
	}
	return (
		<main>
			<div className='catalog-container container'>
				<Filter />
				<section className='catalog'>
					<div className='catalog-products'>
						{products.products.map((product) => (
							<Product
								id={product.id}
								image_url={product.image_url}
								name={product.name}
								price={product.price}
								key={product.id}
							/>
						))}
					</div>
					<Pagination />
				</section>
			</div>
		</main>
	)
})

export default Catalog
