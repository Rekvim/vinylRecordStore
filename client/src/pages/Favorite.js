import React, { useEffect, useState, useContext } from 'react'
import {
	fetchFavorites,
	fetchOneProduct,
	createFavorite,
	removeFavorite,
} from '../http/productAPI'
import FavoriteProduct from '../components/FavoriteProduct/FavoriteProduct'
import '../css/Main.css'
import { Context } from '../index'
import { jwtDecode } from 'jwt-decode'

const Favorite = () => {
	const { users } = useContext(Context)
	const [favorites, setFavorites] = useState([])
	const [productDetails, setProductDetails] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					throw new Error('Token not found')
				}

				const decodedToken = jwtDecode(token)
				const userId = decodedToken.id

				const favoriteProducts = await fetchFavorites(userId)
				setFavorites(favoriteProducts)

				const details = await Promise.all(
					favoriteProducts.map((product) => fetchOneProduct(product.productId))
				)

				const detailsMap = {}
				details.forEach((detail) => {
					detailsMap[detail.id] = detail
				})

				setProductDetails(detailsMap)
				setIsLoading(false) // Установка isLoading в false после успешной загрузки данных
			} catch (error) {
				console.error('Ошибка при загрузке избранных продуктов:', error)
				setIsLoading(false) // Установка isLoading в false в случае ошибки
			}
		}

		if (users.users) {
			loadFavorites()
		}
	}, [users.users]) // Изменил зависимость на users.user

	const handleAddFavorite = async (productId) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			const newFavorite = await createFavorite(productId, userId)
			setFavorites((prevFavorites) => [...prevFavorites, newFavorite])

			const productDetail = await fetchOneProduct(productId)
			setProductDetails((prevDetails) => ({
				...prevDetails,
				[productId]: productDetail,
			}))
		} catch (error) {
			console.error('Ошибка при добавлении в избранное:', error)
		}
	}

	const handleRemoveProduct = async (productIdToRemove) => {
		console.log('Product ID to remove:', productIdToRemove) // Log the productIdToRemove for debugging
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			setFavorites((prevFavorites) =>
				prevFavorites.filter(
					(product) => product.productId !== productIdToRemove
				)
			)
			await removeFavorite(productIdToRemove, userId)
		} catch (error) {
			console.error('Ошибка при удалении продукта из избранного:', error)
		}
	}

	if (isLoading) {
		return <div className='card container'>Загрузка...</div>
	}

	return (
		<main className='main container'>
			{favorites.length === 0 ? (
				<div className='empty-favorite'>
					<h2
						className='medium-title'
						style={{ textAlign: 'center', width: '1198px' }}
					>
						Ваш список избранного пуст!
					</h2>
				</div>
			) : (
				<div className='card'>
					<div className='favorite-product'>
						{favorites.map((product) => (
							<FavoriteProduct
								key={product.productId}
								product={product}
								productDetails={productDetails[product.productId]}
								onRemove={handleRemoveProduct}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	)
}

export default Favorite
