import React from 'react'
import './Order.css'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

const Order = observer(({ totalPrice, onCreateOrder }) => {
	return (
		<section className='order'>
			<span className='order-total'>
				Итого: <b className='order-price'>{totalPrice} руб.</b>
			</span>
			<button className='button-custom' onClick={onCreateOrder}>
				Оформить заказ
			</button>
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
