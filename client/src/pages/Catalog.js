import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import Product from '../components/Product/Product'
import Filter from '../components/Filter/FilterCatalog'
import { observer } from 'mobx-react-lite'
import { fetchGenres, fetchProductVinyl } from '../http/productAPI'
import Pagination from '../components/Pagination/Pagination'

// Компонент Catalog обернут в observer для отслеживания изменений в MobX состоянии
const Catalog = observer(() => {
	const { products } = useContext(Context) // Получение контекста с продуктами

	// Эффект для получения жанров при загрузке компонента
	useEffect(() => {
		fetchGenres().then((data) => products.setGenres(data))
	}, [products])

	// Эффект для получения продуктов при изменении фильтров и параметров пагинации
	useEffect(() => {
		fetchProductVinyl(
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
	}, [
		products.selectedGenres, // Зависимость от выбранных жанров
		products.title, // Зависимость от заголовка (поискового запроса)
		products.minPrice, // Зависимость от минимальной цены
		products.maxPrice, // Зависимость от максимальной цены
		products.page, // Зависимость от текущей страницы
		products, // Добавлено products для обеспечения зависимости
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
