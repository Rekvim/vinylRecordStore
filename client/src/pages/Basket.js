import React, { useEffect, useState, useContext } from 'react'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import Order from '../components/Order/Order'
import { fetchBasket, fetchOneProduct } from '../http/productAPI'
import '../css/Main.css'
import { Context } from '../index'

const Basket = () => {
	const { users } = useContext(Context)
	const [products, setProducts] = useState([])
	const [productDetails, setProductDetails] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadBasket = async () => {
			const basketProducts = await fetchBasket()
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
		}
		loadBasket()
	}, [users])

	const handleRemoveProduct = (productIdToRemove) => {
		setProducts(
			products.filter((product) => product.productId !== productIdToRemove)
		)
		users.setCartCount(users.cartCount - 1)
		const newDetails = { ...productDetails }
		delete newDetails[productIdToRemove]
		setProductDetails(newDetails)
	}

	const handleUpdateProduct = (updatedProduct) => {
		setProducts(
			products.map((product) =>
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

	if (isLoading) {
		return <div className='card container'>Загрузка...</div>
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
					<Order totalPrice={getTotalPrice()} />
				</div>
			)}
		</main>
	)
}

export default Basket
