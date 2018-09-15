const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL, {logging: false})

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  rating: Sequelize.INTEGER
})

const syncAndSeed = () => {
  return db.sync({force: true})
    .then(() =>
      Promise.all([
      Product.create({ name: 'foo'}),
      Product.create({ name: 'bar'}),
      Product.create({ name: 'bazz'})
      ])
    )
    .then(() => console.log('synced and seeded'))
}

module.exports = {
  syncAndSeed,
  Product
}
