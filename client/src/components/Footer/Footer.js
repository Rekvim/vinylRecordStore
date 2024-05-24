import React from 'react'
import './Footer.module.css'
import '../../css/Main.css'
const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-content container'>
				<ul className='footer-info'>
					<li className='footer-title'>
						<p className='footer-title medium-title'>Информация</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text'>Контакт</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							Продажа
						</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							Возврат
						</p>
					</li>
				</ul>
				<ul className='footer-info'>
					<li className='footer-title'>
						<p className='footer-title medium-title'>Компания</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							Условия доставки
						</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							Вопросы и Ответы
						</p>
					</li>
				</ul>
				<ul className='footer-info'>
					<li className='footer-title'>
						<p className='footer-title medium-title'>Контакты</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							+7 999 999 99 99
						</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''>
							mail@email.ru
						</p>
					</li>
					<li className='footer-cell nets'>
						<p className='footer-link net' href=''>
							<svg
								width='28'
								height='28'
								viewBox='0 0 28 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									className='net-path'
									d='M15.8126 8.22559H20.3126V3.72559H15.8126C14.3208 3.72559 12.89 4.31822 11.8351 5.37311C10.7803 6.428 10.1876 7.85874 10.1876 9.35059V12.7256H6.81262V17.2256H10.1876V23.9756H14.6876V17.2256H18.0626L19.1876 12.7256H14.6876V9.35059C14.6876 9.05222 14.8061 8.76607 15.0171 8.55509C15.2281 8.34411 15.5143 8.22559 15.8126 8.22559V8.22559Z'
									stroke='rgba(245, 245, 245, 0.6)'
									strokeWidth='1.6875'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</p>
						<p className='footer-link net' href=''>
							<svg
								width='28'
								height='28'
								viewBox='0 0 28 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									className='net-path'
									d='M22.5625 23.9756H4.5625C4.26413 23.9756 3.97798 23.8571 3.767 23.6461C3.55603 23.4351 3.4375 23.149 3.4375 22.8506V4.85059C3.4375 4.55222 3.55603 4.26607 3.767 4.05509C3.97798 3.84411 4.26413 3.72559 4.5625 3.72559H22.5625C22.8609 3.72559 23.147 3.84411 23.358 4.05509C23.569 4.26607 23.6875 4.55222 23.6875 4.85059V22.8506C23.6875 23.149 23.569 23.4351 23.358 23.6461C23.147 23.8571 22.8609 23.9756 22.5625 23.9756ZM10.1875 13.8506C10.1875 14.5181 10.3854 15.1706 10.7563 15.7256C11.1271 16.2807 11.6542 16.7132 12.2709 16.9687C12.8876 17.2241 13.5662 17.291 14.2209 17.1607C14.8756 17.0305 15.477 16.7091 15.949 16.2371C16.421 15.7651 16.7424 15.1637 16.8727 14.509C17.0029 13.8543 16.936 13.1757 16.6806 12.559C16.4251 11.9423 15.9926 11.4152 15.4375 11.0444C14.8825 10.6735 14.23 10.4756 13.5625 10.4756C12.6674 10.4756 11.8089 10.8312 11.176 11.4641C10.5431 12.097 10.1875 12.9555 10.1875 13.8506Z'
									stroke='rgba(245, 245, 245, 0.6)'
									strokeWidth='1.6875'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									className='net-path'
									d='M19.1315 8.22534H19.2425'
									stroke='rgba(245, 245, 245, 0.6)'
									strokeWidth='2.19375'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</p>
						<p className='footer-link net' href=''>
							<svg
								width='28'
								height='28'
								viewBox='0 0 28 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									className='net-path'
									d='M9.82749 12.6584L11.5487 10.9259L11.0987 9.35088H9.06249C9.06249 9.35088 8.60124 12.2084 11.8975 15.4934C15.1937 18.7784 18.0625 18.3509 18.0625 18.3509V16.3146L16.4875 15.8646L14.755 17.5859M23.5525 15.4934C23.2932 17.0684 22.6652 18.5598 21.7198 19.8459C20.7743 21.132 19.5382 22.1764 18.1122 22.8937C16.6863 23.6111 15.1109 23.9811 13.5147 23.9737C11.9185 23.9662 10.3467 23.5815 8.92749 22.8509L3.43749 23.9759L4.56249 18.4859C3.82827 17.0615 3.44264 15.4831 3.43731 13.8806C3.43198 12.2781 3.80711 10.6972 4.53184 9.26793C5.25657 7.83865 6.31021 6.60182 7.60612 5.65912C8.90203 4.71643 10.4032 4.0948 11.9862 3.84535C13.5692 3.59589 15.1887 3.72575 16.7118 4.22423C18.2348 4.72271 19.6177 5.57558 20.7469 6.71272C21.876 7.84985 22.7191 9.23876 23.2069 10.7652C23.6946 12.2917 23.8131 13.9122 23.5525 15.4934V15.4934Z'
									stroke='rgba(245, 245, 245, 0.6)'
									strokeWidth='1.6875'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</p>
					</li>
				</ul>
				<ul className='footer-info'>
					<li className='footer-cell'>
						<p className='footer-title medium-title'>Регистрация</p>
					</li>
					<li className='footer-cell'>
						<p className='footer-link small-text' href=''>
							Новые скидки, акции, специальный контент о уличной одежде, моде,
							стиле и городской культуре. Зарегистрируйтесь и будьте в курсе
							всего, что происходит!
						</p>
					</li>
					<li className='footer-cell'>
						<input
							className='footer-input input-custom-light'
							type='text'
							placeholder='ваш email*'
						/>
					</li>
					<li className='footer-cell'>
						<p className='footer-link text' href=''></p>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
