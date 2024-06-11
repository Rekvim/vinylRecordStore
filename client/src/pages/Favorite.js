import React, { useEffect, useState, useContext } from 'react'
import {
	fetchFavorites,
	fetchOneProduct,
	removeFavorite,
} from '../http/productAPI'
import FavoriteProduct from '../components/FavoriteProduct/FavoriteProduct'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import '../css/Main.css'
import { Context } from '../index'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Favorite = () => {
	const { users } = useContext(Context)
	const [favorites, setFavorites] = useState([])
	const [productDetails, setProductDetails] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					throw new Error('Token not found')
				}

				const favoriteProducts = await fetchFavorites(users.usersId)
				setFavorites(favoriteProducts)

				const details = await Promise.all(
					favoriteProducts.map((product) => fetchOneProduct(product.productId))
				)

				const detailsMap = {}
				details.forEach((detail) => {
					detailsMap[detail.id] = detail
				})

				setProductDetails(detailsMap)
				setLoading(false) // Установка loading в false после успешной загрузки данных
			} catch (error) {
				console.error('Ошибка при загрузке избранных продуктов:', error)
				setLoading(false) // Установка loading в false в случае ошибки
			}
		}

		if (users.users) {
			loadFavorites()
		}
	}, [users.users, users.usersId]) // Изменил зависимость на users.user

	const handleRemoveProduct = async (productIdToRemove) => {
		console.log('Product ID to remove:', productIdToRemove) // Log the productIdToRemove for debugging
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}
			setFavorites((prevFavorites) =>
				prevFavorites.filter(
					(product) => product.productId !== productIdToRemove
				)
			)
			await removeFavorite(productIdToRemove, users.usersId)
		} catch (error) {
			toast.error('Ошибка при удалении продукта из избранного:', error)
		}
	}

	if (loading) {
		return (
			<main className='main container'>
				<LoadingScreen loading={loading} />
			</main>
		)
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
