import React, { useEffect, useState, useContext } from 'react'
import {
	fetchFavourites,
	fetchOneProduct,
	createFavourite,
	removeFavourite,
} from '../http/productAPI'
import FavouriteProduct from '../components/FavouriteProduct/FavouriteProduct'
import '../css/Main.css'
import { Context } from '../index'
import { jwtDecode } from 'jwt-decode'

const Favourite = () => {
	const { users } = useContext(Context)
	const [favourites, setFavourites] = useState([])
	const [productDetails, setProductDetails] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadFavourites = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					throw new Error('Token not found')
				}

				const decodedToken = jwtDecode(token)
				const userId = decodedToken.id

				const favouriteProducts = await fetchFavourites(userId)
				setFavourites(favouriteProducts)

				const details = await Promise.all(
					favouriteProducts.map((product) => fetchOneProduct(product.productId))
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
			loadFavourites()
		}
	}, [users.users]) // Изменил зависимость на users.user

	const handleAddFavourite = async (productId) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			const newFavourite = await createFavourite(productId, userId)
			setFavourites((prevFavourites) => [...prevFavourites, newFavourite])

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
			setFavourites((prevFavourites) =>
				prevFavourites.filter(
					(product) => product.productId !== productIdToRemove
				)
			)
			await removeFavourite(productIdToRemove, userId)
		} catch (error) {
			console.error('Ошибка при удалении продукта из избранного:', error)
		}
	}

	if (isLoading) {
		return <div className='card container'>Загрузка...</div>
	}

	return (
		<main className='main container'>
			{favourites.length === 0 ? (
				<div className='empty-favourite'>
					<h2
						className='medium-title'
						style={{ textAlign: 'center', width: '1198px' }}
					>
						Ваш список избранного пуст!
					</h2>
				</div>
			) : (
				<div className='card'>
					<div className='favourite-product'>
						{favourites.map((product) => (
							<FavouriteProduct
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

export default Favourite
