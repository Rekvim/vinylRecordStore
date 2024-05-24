import Basket from './pages/Basket'
import News from './pages/News'
import Politics from './pages/Politics'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import ProductPage from './pages/ProductPage'
import Catalog from './pages/Catalog'
import NewPage from './pages/NewPage'
import Admin from './pages/Admin'

export const authRoutes = [
	{
		path: '/admin',
		Component: Admin,
	},
	{
		path: '/cart',
		Component: Basket,
	},
]

export const publicRoutes = [
	{
		path: '/',
		Component: Shop,
	},
	{
		path: '/login',
		Component: Auth,
	},
	{
		path: '/registration',
		Component: Auth,
	},
	{
		path: '/catalog/product/:id',
		Component: ProductPage,
	},
	{
		path: '/product/:id',
		Component: ProductPage,
	},
	{
		path: '/catalog',
		Component: Catalog,
	},
	{
		path: '/news',
		Component: News,
	},
	{
		path: '/news/:id',
		Component: NewPage,
	},
	{
		path: '/cart/politics',
		Component: Politics,
	},
]
