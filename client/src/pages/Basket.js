import React, { useEffect, useState, useContext } from 'react'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Order from '../components/Order/Order'
import {
	fetchBasket,
	fetchOneProduct,
	createOrders,
	removeBasketProduct,
} from '../http/productAPI'
import '../css/Main.css'
import { Context } from '../index'
import { jwtDecode } from 'jwt-decode'

const Basket = () => {
	const { users } = useContext(Context)

	const [products, setProducts] = useState([])
	const [productDetails, setProductDetails] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadBasket = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					throw new Error('Token not found')
				}
				const decodedToken = jwtDecode(token)
				const basketId = decodedToken
				console.log(basketId.id)
				if (!basketId) {
					console.error('Basket ID is undefined')
					return
				}
				const basketProducts = await fetchBasket(basketId.id)
				setProducts(basketProducts)
				users.setCartCount(basketProducts.length)

				const details = await Promise.all(
					basketProducts.map((product) => fetchOneProduct(product.productId))
				)
				const detailsMap = {}
				details.forEach((detail) => {
					detailsMap[detail.id] = detail
				})
				setProductDetails(detailsMap)
				setIsLoading(false)
			} catch (error) {
				console.error('Error loading basket products:', error)
			}
		}

		loadBasket()
	}, [users])

	const handleRemoveProduct = async (productIdToRemove) => {
		try {
			setProducts((prevProducts) =>
				prevProducts.filter(
					(product) => product.productId !== productIdToRemove
				)
			)
			users.setCartCount((prevCount) => prevCount - 1)
			setProductDetails((prevDetails) => {
				const newDetails = { ...prevDetails }
				delete newDetails[productIdToRemove]
				return newDetails
			})
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error)
		}
	}

	const handleUpdateProduct = (updatedProduct) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.productId === updatedProduct.productId
					? updatedProduct
					: product
			)
		)
	}

	const getTotalPrice = () => {
		return products.reduce((total, product) => {
			const details = productDetails[product.productId]
			return total + (details ? details.price * product.quantity : 0)
		}, 0)
	}

	const handleCreateOrder = async (address) => {
		try {
			const productsWithDetails = products.map((product) => {
				const details = productDetails[product.productId]
				if (!details) {
					throw new Error(
						`Деталей продукта по ID ${product.productId} не найдено`
					)
				}
				return {
					basketProductId: product.id,
					price: details.price,
					quantity: product.quantity,
				}
			})

			await createOrders({
				userId: users.usersId,
				products: productsWithDetails,
				address: address.value,
			})
			await Promise.all(
				products.map((product) =>
					removeBasketProduct(product.basketId, product.productId)
				)
			)
			setProducts([])
			users.setCartCount(0)
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
		}
	}

	if (isLoading) {
		return <LoadingScreen loading={isLoading} />
	}

	return (
		<main className='main container'>
			{products.length === 0 ? (
				<div className='empty-cart'>
					<h2
						className='medium-title'
						style={{ textAlign: 'center', width: '1198px' }}
					>
						Ваша корзина пуста!
					</h2>
				</div>
			) : (
				<div className='card'>
					<div className='basket-product'>
						{products.map((product) => (
							<BasketProduct
								key={product.productId}
								product={product}
								productDetails={productDetails[product.productId]}
								onRemove={handleRemoveProduct}
								onUpdate={handleUpdateProduct}
							/>
						))}
					</div>
					<Order
						totalPrice={getTotalPrice()}
						onCreateOrder={handleCreateOrder}
					/>
				</div>
			)}
		</main>
	)
}

export default Basket
