import React, { useEffect, useState, useContext } from 'react'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import Order from '../components/Order/Order'
import { fetchBasket, fetchOneProduct, createOrder } from '../http/productAPI'
import '../css/Main.css'
import { Context } from '../index'

const Basket = () => {
	// Получение доступа к контексту
	const { users } = useContext(Context)

	// Состояния компонента
	const [products, setProducts] = useState([]) // Продукты в корзине
	const [productDetails, setProductDetails] = useState({}) // Детали о продуктах
	const [isLoading, setIsLoading] = useState(true) // Состояние загрузки

	// Загрузка продуктов и их деталей из корзины при монтировании компонента
	useEffect(() => {
		const loadBasket = async () => {
			try {
				// Получение продуктов из корзины
				const basketProducts = await fetchBasket()
				setProducts(basketProducts)
				users.setCartCount(basketProducts.length)

				// Получение деталей о продуктах
				const details = await Promise.all(
					basketProducts.map((product) => fetchOneProduct(product.productId))
				)
				// Преобразование массива деталей в объект для удобства доступа по id продукта
				const detailsMap = {}
				details.forEach((detail) => {
					detailsMap[detail.id] = detail
				})
				setProductDetails(detailsMap)
				setIsLoading(false)
			} catch (error) {
				console.error('Ошибка при загрузке продуктов:', error)
			}
		}
		loadBasket()
	}, [users])

	// Обработчик удаления продукта из корзины
	const handleRemoveProduct = (productIdToRemove) => {
		setProducts(
			products.filter((product) => product.productId !== productIdToRemove)
		)
		users.setCartCount(users.cartCount - 1)
		const newDetails = { ...productDetails }
		delete newDetails[productIdToRemove]
		setProductDetails(newDetails)
	}

	// Обработчик обновления информации о продукте в корзине
	const handleUpdateProduct = (updatedProduct) => {
		setProducts(
			products.map((product) =>
				product.productId === updatedProduct.productId
					? updatedProduct
					: product
			)
		)
	}

	// Получение общей стоимости продуктов в корзине
	const getTotalPrice = () => {
		return products.reduce((total, product) => {
			const details = productDetails[product.productId]
			return total + (details ? details.price * product.quantity : 0)
		}, 0)
	}

	// Обработчик создания заказа
	const handleCreateOrder = async () => {
		try {
			// Получение id корзины пользователя
			const basketId = users.basketId
			// Добавление id корзины к каждому продукту
			const productsWithBasketProductId = products.map((product) => ({
				...product,
				basketProductId: product.id,
			}))
			// Создание заказа на сервере
			await createOrder({ basketId, products: productsWithBasketProductId })
			// Очистка корзины после создания заказа
			setProducts([])
			users.setCartCount(0)
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
		}
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
