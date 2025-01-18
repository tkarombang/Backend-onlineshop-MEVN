const express = require('express')
const app = express()
const PORT = 8000
const db = require('./app/models/database')


//MIDDLEWARE  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//KONEKSI DATABASE
db.connectDB()

//ROUTE UTAMA
app.get('/', (req, res) => {
  res.json({
    message: "welcome to onlineshope server"
  })
})

//IMPORT ROUTE
const productRouter = require('./app/routes/product.routes')
const orderRouter = require('./app/routes/order.routes')

//ROUTE PRODUCTS
app.use('/api/products', productRouter)
//ROUTE ORDERS
app.use('/api/orders', orderRouter)

//JALANKAN SERVER
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})