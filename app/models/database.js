const dbConfig = require('../../config/db_config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// const connectDB = () => {
//   mongoose
//     .connect(dbConfig.url)
//     .then(() => {
//       console.log('DATABASE CONNECTED')
//     })
//     .catch((err) => {
//       console.error('CANNOT CONNECT TO DATABASE:', err)
//       process.exit()
//     })
// }

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url)
    console.log('DATABASE CONNECTED')
  } catch (err) {
    console.error('CANNOT CONNECT TO DATABASE', err)
    process.exit()
  }
}

const db = {
  connectDB,
  mongoose,
  products: require('./product.model')(mongoose), //MODEL PRODUCTS
  orders: require('./order.model')(mongoose) //MODEL ORDERS
}

module.exports = db