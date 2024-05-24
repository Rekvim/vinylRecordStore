import React, { useContext, useState } from 'react'
import '../css/Main.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import PhoneInput from 'react-phone-number-input'
import ru from 'react-phone-number-input/locale/ru'
import 'react-phone-number-input/style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Auth = observer(() => {
	const { users } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()

	const isLogin = location.pathname === '/login'
	const [telephone, setTelephone] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const phoneRegex = /^\+\d{1,3}\d{10}$/

	const handlePhoneChange = (value) => {
		if (value) {
			// Удаление всех символов, за исключением начального +
			const cleanedValue = value.replace(/[^\d+]/g, '')

			// Проверка, чтобы очищенное значение не превышало 12 символов (1 для + и 11 цифр)
			if (cleanedValue.length <= 12) {
				setTelephone(value)
			} else {
				toast.error('Номер телефона не должен превышать 12 символов.')
			}
		} else {
			setTelephone('')
		}
	}

	const handleKeyDown = (event) => {
		// Если длина номера телефона больше или равна 12 и клавиша не является Backspace или Delete, предотвращаем ввод
		if (
			telephone.length >= 12 &&
			event.key !== 'Backspace' &&
			event.key !== 'Delete'
		) {
			event.preventDefault()
		}
	}

	const click = async () => {
		try {
			if (!phoneRegex.test(telephone)) {
				toast.error(
					'Некорректный номер телефона. Убедитесь, что он начинается с + и содержит правильное количество цифр.'
				)
				return
			}
			if (isLogin) {
				await login(telephone, password)
				toast.success('Успешная авторизация!')
			} else {
				await registration(telephone, password)
				toast.success('Успешная регистрация!')
			}
			users.setUsers(users)
			users.setIsAuth(true)
			navigate('/')
		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<div className='auth-container'>
			<div className='auth-box'>
				<h2 className='auth-title medium-title'>
					{isLogin ? 'Авторизация' : 'Регистрация'}
				</h2>
				<PhoneInput
					labels={ru}
					defaultCountry='RU'
					international
					placeholder='Введите Телефон'
					value={telephone}
					onChange={handlePhoneChange}
					onKeyDown={handleKeyDown}
					className='input-custom-dark auth-input'
				/>
				<div className='password-input-wrapper'>
					<input
						type={showPassword ? 'text' : 'password'}
						name='password'
						placeholder='Введите пароль'
						value={password}
						autoComplete='on'
						onChange={(e) => setPassword(e.target.value)}
						className='input-custom-dark auth-input'
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='show-password-button'
					>
						<p style={{ marginBottom: '10px' }}>
							{showPassword ? 'Скрыть пароль' : 'Показать пароль'}
						</p>
					</button>
				</div>
				<div className='auth-links'>
					{isLogin ? (
						<div className='auth-link'>
							Нет аккаунта?{' '}
							<NavLink to='/registration' className='auth-navlink'>
								Зарегистрируйся!
							</NavLink>
						</div>
					) : (
						<div className='auth-link'>
							Есть аккаунт?{' '}
							<NavLink to='/login' className='auth-navlink'>
								Войдите!
							</NavLink>
						</div>
					)}
				</div>
				<button className='button-custom auth-button' onClick={click}>
					{isLogin ? 'Войти' : 'Регистрация'}
				</button>
			</div>
			<ToastContainer />
		</div>
	)
})

export default Auth
