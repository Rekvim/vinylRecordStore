import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

const PaymentForm = () => {
	const [cardData, setCardData] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	})

	const handleInputFocus = (e) => {
		setCardData({ ...cardData, focus: e.target.name })
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setCardData({ ...cardData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Здесь вы можете отправить данные кредитной карты на сервер для обработки платежа
	}

	return (
		<div id='PaymentForm'>
			<Cards
				cvc={cardData.cvc}
				expiry={cardData.expiry}
				focused={cardData.focus}
				name={cardData.name}
				number={cardData.number}
			/>
			<form onSubmit={handleSubmit}>
				<input
					type='tel'
					name='number'
					placeholder='Card Number'
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
				{/* Добавьте другие поля для ввода данных о карте */}
				<button type='submit'>Оплатить</button>
			</form>
		</div>
	)
}

export default PaymentForm
