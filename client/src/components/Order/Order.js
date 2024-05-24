import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { fetchOrders } from '../http/orderAPI'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

const Order = observer(({ totalPrice }) => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const loadOrders = async () => {
			const fetchedOrders = await fetchOrders()
			setOrders(fetchedOrders)
		}
		loadOrders()
	}, [])
	return (
		<section className='order'>
			<span className='order-total'>
				Итого: <b className='order-price'>{totalPrice} руб.</b>
			</span>
			<button className='button-custom'>Оформить заказ</button>
			<span className='order-politics'>
				Нажимая на кнопку «оплатить заказ», я принимаю условия публичной оферты
				и&nbsp;
				<NavLink to='politics/' className='politics-links'>
					политики&nbsp;конфиденциальности
				</NavLink>
			</span>
		</section>
	)
})

export default Order
