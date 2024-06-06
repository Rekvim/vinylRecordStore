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
							Новые скидки, акции, специальный контент, новости.
							Зарегистрируйтесь и будьте в курсе всего, что происходит!
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
