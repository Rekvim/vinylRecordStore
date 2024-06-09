const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// Определение моделей

const Role = sequelize.define('roles', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Favourite = sequelize.define('favourites', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	productId: { type: DataTypes.INTEGER, allowNull: false },
	userId: { type: DataTypes.INTEGER, allowNull: false },
})

const User = sequelize.define('users', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	surname: { type: DataTypes.STRING },
	patronymic: { type: DataTypes.STRING },
	telephone: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
})
const Genre = sequelize.define('genres', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Author = sequelize.define('authors', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Product = sequelize.define('products', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	image_url: { type: DataTypes.STRING, allowNull: false },
})

const ProductInfo = sequelize.define('product_infos', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})
const Basket = sequelize.define('baskets', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const BasketProduct = sequelize.define('basket_products', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})
const Order = sequelize.define('orders', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	userId: { type: DataTypes.INTEGER, allowNull: false },
	quantity: { type: DataTypes.INTEGER, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
})

const New = sequelize.define('news', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

const NewInfo = sequelize.define('new_infos', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

// Определение отношений
Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Basket)
Basket.belongsTo(User)

Genre.hasMany(Product)
Product.belongsTo(Genre)

Author.hasMany(Product)
Product.belongsTo(Author)

Product.hasOne(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.hasMany(Order)
Order.belongsTo(BasketProduct)

New.hasMany(NewInfo, { as: 'info' })
NewInfo.belongsTo(New)

module.exports = {
	Role,
	User,
	Author,
	Basket,
	Genre,
	Product,
	ProductInfo,
	BasketProduct,
	Order,
	Favourite,
	New,
	NewInfo,
}
