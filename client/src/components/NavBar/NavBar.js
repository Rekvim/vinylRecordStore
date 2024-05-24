import React, { useContext } from 'react'
import { Context } from '../../index'
import './NavBar.css'
import '../../css/Main.css'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

const NavBar = observer(() => {
	const { users } = useContext(Context)

	const logOut = () => {
		users.setUsers({})
		users.setIsAuth(false)
	}

	return (
		<header className='header'>
			<div className='header-container container'>
				<nav className='header__nav-bar menu'>
					<NavLink to='/'>
						<svg
							class='logo-icon'
							width='50'
							height='50'
							viewBox='0 0 79 78'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M56.6899 59.13V60.12'
								stroke='black'
								stroke-width='2'
								stroke-miterlimit='10'
							/>
							<path
								d='M39.5 1C18.24 1 1 18.01 1 39C1 59.99 18.24 77 39.5 77C60.76 77 78 59.99 78 39C78 18.01 60.76 1 39.5 1ZM39.5 50C33.15 50 28 44.85 28 38.5C28 32.15 33.15 27 39.5 27C45.85 27 51 32.15 51 38.5C51 44.85 45.85 50 39.5 50Z'
								fill='black'
								stroke='white'
								stroke-miterlimit='10'
							/>
							<path
								d='M38.76 44C41.654 44 44 41.7614 44 39C44 36.2386 41.654 34 38.76 34C35.866 34 33.52 36.2386 33.52 39C33.52 41.7614 35.866 44 38.76 44Z'
								fill='black'
							/>
							<path
								d='M38.5 5.49994C41.53 5.48994 50.79 5.85994 59.5 12.4999C70.09 20.5799 72.2 32.0899 72.61 34.6299'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M22.5 13.5C24.78 12.17 29.33 9.92996 35.5 9.49996C38.28 9.30996 43.1 9.35996 48.5 11.5C55.65 14.33 59.78 19.2 61.5 21.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M13.5 30.5C14.16 28.31 16.09 23.02 21.31 18.95C26.1 15.22 31.09 14.51 33.57 14.2C37.3 13.72 40.43 14.1 42.49 14.51'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M16.4999 40.5C16.4199 38.37 16.5499 33.51 19.4999 28.5C23.7499 21.29 30.7799 19.01 32.4999 18.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M25.6001 50.51C24.7801 49.25 20.7901 42.84 22.8401 35.23C23.6701 32.14 25.2201 29.9 26.4001 28.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M33.4101 72.33C31.1301 71.87 18.9001 69.19 11.5001 57.5C6.15009 49.05 6.30009 40.59 6.50009 37.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M51.5 67.5C48.83 68.49 43.75 69.97 37.37 69.28C29.36 68.41 24.01 64.63 22.5 63.5C17.33 59.63 14.7 55 13.5 52.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M64.1301 53.34C63.2201 54.76 61.7501 56.75 59.5201 58.7C58.2901 59.78 53.8701 63.44 46.9301 64.66C40.9601 65.71 36.1401 64.43 33.8201 63.64'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M62.5 41.5C62.54 42.79 62.6 49.27 57.59 54.65C52.03 60.62 44.63 60.53 43.5 60.5'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M55.9901 31.17C56.5601 32.56 59.2801 39.61 55.8401 46.69C54.4401 49.57 52.5001 51.4801 51.0801 52.6301'
								stroke='white'
								stroke-width='1.5'
								stroke-miterlimit='10'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</NavLink>
					<NavLink to='catalog' className='menu-link text'>
						Каталог
					</NavLink>
					<NavLink to='news' className='menu-link text'>
						Новости
					</NavLink>
				</nav>
				{users.isAuth ? (
					<nav className='header__nav-user-bar'>
						<NavLink to='cart' className='menu-user-links'>
							<svg
								className='card-icon header-icon'
								width='25'
								height='25'
								viewBox='0 0 25 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g clipPath='url(#clip0_1_18)'>
									<path
										className='icon-background'
										d='M3.81655 5.48063L0 1.66525L1.66525 0L5.48063 3.81655H23.4183C23.6017 3.81654 23.7826 3.85941 23.9466 3.94173C24.1105 4.02406 24.2529 4.14356 24.3624 4.2907C24.4719 4.43785 24.5456 4.60856 24.5774 4.78921C24.6092 4.96986 24.5984 5.15545 24.5457 5.33117L21.7213 14.746C21.6486 14.9886 21.4997 15.2012 21.2966 15.3524C21.0935 15.5035 20.847 15.5852 20.5938 15.5851H6.17027V17.9389H19.1157V20.2926H4.99341C4.68129 20.2926 4.38195 20.1686 4.16125 19.9479C3.94054 19.7272 3.81655 19.4278 3.81655 19.1157V5.48063ZM6.17027 6.17027V13.2314H19.7183L21.8366 6.17027H6.17027ZM5.58184 25C5.11366 25 4.66465 24.814 4.33359 24.483C4.00254 24.1519 3.81655 23.7029 3.81655 23.2347C3.81655 22.7665 4.00254 22.3175 4.33359 21.9865C4.66465 21.6554 5.11366 21.4694 5.58184 21.4694C6.05002 21.4694 6.49903 21.6554 6.83009 21.9865C7.16114 22.3175 7.34713 22.7665 7.34713 23.2347C7.34713 23.7029 7.16114 24.1519 6.83009 24.483C6.49903 24.814 6.05002 25 5.58184 25ZM19.7041 25C19.236 25 18.7869 24.814 18.4559 24.483C18.1248 24.1519 17.9388 23.7029 17.9388 23.2347C17.9388 22.7665 18.1248 22.3175 18.4559 21.9865C18.7869 21.6554 19.236 21.4694 19.7041 21.4694C20.1723 21.4694 20.6213 21.6554 20.9524 21.9865C21.2834 22.3175 21.4694 22.7665 21.4694 23.2347C21.4694 23.7029 21.2834 24.1519 20.9524 24.483C20.6213 24.814 20.1723 25 19.7041 25Z'
										fill='rgba(45, 45, 45, 0.6)'
									/>
								</g>
								<defs>
									<clipPath id='clip0_1_18'>
										<rect width='25' height='25' fill='white' />
									</clipPath>
								</defs>
							</svg>
							{users.cartCount > 0 && (
								<span className='cart-count'>{users.cartCount}</span>
							)}
						</NavLink>
						<NavLink
							onClick={logOut}
							to='/'
							className='header__button button-custom'
						>
							Выйти
						</NavLink>
					</nav>
				) : (
					<nav className='header__nav-auth'>
						<NavLink to='/login' className='menu-user-links'>
							<svg
								className='login-icon header-icon'
								width='25'
								height='25'
								viewBox='0 0 25 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g clipPath='url(#clip0_1_18)'>
									<path
										className='icon-background'
										d='M12.5 0C19.3968 0 25 5.60318 25 12.5C25 19.3968 19.3968 25 12.5 25C5.60318 25 0 19.3968 0 12.5C0 5.60318 5.60318 0 12.5 0ZM12.5 2.77778C9.40443 2.77778 6.94493 5.23728 6.94493 8.33286C6.94493 11.4284 9.40443 13.8879 12.5 13.8879C15.5956 13.8879 18.0551 11.4284 18.0551 8.33286C18.0551 5.23728 15.5956 2.77778 12.5 2.77778ZM12.5 22.1875C16.4551 22.1875 19.7588 19.969 21.4032 16.7188C20.8928 14.2685 18.5293 12.5 15.625 12.5H9.375C6.47073 12.5 4.10722 14.2685 3.59687 16.7188C5.24125 19.969 8.54494 22.1875 12.5 22.1875Z'
										fill='rgba(45, 45, 45, 0.6)'
									/>
								</g>
								<defs>
									<clipPath id='clip0_1_18'>
										<rect width='25' height='25' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</NavLink>
					</nav>
				)}
			</div>
		</header>
	)
})

export default NavBar
