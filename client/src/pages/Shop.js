import React, { useEffect, useState } from 'react'
import Swiper from '../components/Swiper/Swiper'
import { fetchProductVinyl } from '../http/productAPI'
import '../css/Main.css'

const Shop = () => {
	const [bestsellers, setBestsellers] = useState([])
	const [newReleases, setNewReleases] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Получаем бестселлеры и новинки
				const bestsellersData = await fetchProductVinyl()
				const newReleasesData = await fetchProductVinyl()

				// Проверка данных и вывод в консоль для отладки
				console.log('Bestsellers data:', bestsellersData)
				console.log('New releases data:', newReleasesData)

				if (bestsellersData && Array.isArray(bestsellersData.rows)) {
					setBestsellers(bestsellersData.rows)
				} else {
					console.error('Bestsellers data is not an array')
				}

				if (newReleasesData && Array.isArray(newReleasesData.rows)) {
					setNewReleases(newReleasesData.rows)
				} else {
					console.error('New releases data is not an array')
				}
			} catch (error) {
				console.error('Ошибка при загрузке продуктов:', error)
			}
		}
		fetchData()
	}, [])

	return (
		<main>
			<section className='hello'>
				<div className='hello-info'>
					<h3 className='hello-title medium-title'>новые поступления</h3>
					<p className='hello-link text'>ПЕРЕЙТИ</p>
				</div>
			</section>
			<section className='category container'>
				<h2 className='category-title big-title bestseller'>Хит продаж</h2>
				<div className='products'>
					<Swiper items={bestsellers} itemsPerPage={5} />
				</div>
			</section>
			<section className='category container'>
				<h2 className='category-title big-title bestseller'>Свежие релизы</h2>
				<div className='products'>
					<Swiper items={newReleases} itemsPerPage={5} />
				</div>
			</section>
		</main>
	)
}

export default Shop
