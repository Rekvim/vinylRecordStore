import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import Product from '../components/Product/Product'
import Filter from '../components/Filter/FilterCatalog'
import { observer } from 'mobx-react-lite'
import { fetchGenres, fetchProductVinyl } from '../http/productAPI'
import Pagination from '../components/Pagination/Pagination'

const Catalog = observer(() => {
	const { products } = useContext(Context)

	useEffect(() => {
		fetchGenres().then((data) => products.setGenres(data))
	}, [products])

	useEffect(() => {
		fetchGenres().then((data) => products.setGenres(data))
	}, [])

	useEffect(() => {
		fetchProductVinyl(
			products.selectedGenres,
			products.title,
			products.minPrice,
			products.maxPrice,
			products.page,
			products.limit // Используем лимит из состояния
		).then((data) => {
			products.setProducts(data.rows)
			products.setTotalCount(data.count)
		})
	}, [
		products.selectedGenres,
		products.title,
		products.minPrice,
		products.maxPrice,
		products.page, // Следим за изменениями страницы
	])

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
