import React, { useState } from 'react'
import './Order.css'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { toast } from 'react-toastify'
const Order = observer(({ totalPrice, onCreateOrder }) => {
	const [address, setAddress] = useState(null)
	const token = 'fcd47c1a2a6b95056baefd5669b236bf00d10f76'

	const handleOrderCreation = () => {
		if (address && address.value) {
			onCreateOrder(address)
		} else {
			toast.error(`Адрес не введен`)
		}
	}

	return (
		<section className='order'>
			<p>Введите адрес:</p>
			<AddressSuggestions token={token} value={address} onChange={setAddress} />
			<p>Выбранный адрес: {address && address.value}</p>
			<p className='order-total'>
				Итого: <b className='order-price'>{totalPrice} руб.</b>
			</p>
			<button className='button-custom' onClick={handleOrderCreation}>
				Оформить заказ
			</button>
			<p className='order-politics'>
				Нажимая на кнопку «оплатить заказ», я принимаю условия публичной оферты
				и&nbsp;
				<NavLink to='/politics' className='politics-links'>
					политики&nbsp;конфиденциальности
				</NavLink>
			</p>
		</section>
	)
})

export default Order
