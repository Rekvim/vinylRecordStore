import React, { useContext } from 'react'
import './Pagination.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

const Pagination = observer(() => {
	const { products } = useContext(Context)
	const pageCount = Math.ceil(products.totalCount / products.limit)
	const pages = []

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}

	return (
		<ul className='pagination'>
			{pages.map((page) => (
				<li key={page} className='pagination-catalog__li'>
					<button
						className={`pagination__button ${
							page === products.page ? 'pagination__button-active' : null
						}`}
						onClick={() => products.setPage(page)}
					>
						{page}
					</button>
				</li>
			))}
		</ul>
	)
})

export default Pagination
