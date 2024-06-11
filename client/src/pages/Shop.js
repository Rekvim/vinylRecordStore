import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../index'
import Swiper from '../components/Swiper/Swiper'
import { fetchProduct } from '../http/productAPI'
import '../css/Main.css'
import { jwtDecode } from 'jwt-decode'

const Shop = () => {
	const { users } = useContext(Context)
	const token = localStorage.getItem('token')
	if (!token) {
		throw new Error('Token not found')
	}
	const decodedToken = jwtDecode(token)
	const userId = decodedToken.id // Предполагаем, что id пользователя хранится в token
	users.setUsersId(userId)
	// Локальные состояния для хранения данных о лучших продажах и новых поступлениях
	const [bestsellers, setBestsellers] = useState([])
	const [newReleases, setNewReleases] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Получаем данные о бестселлерах и новых поступлениях
				const bestsellersData = await fetchProduct()
				const newReleasesData = await fetchProduct()

				// Проверяем полученные данные и устанавливаем их в локальное состояние
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
