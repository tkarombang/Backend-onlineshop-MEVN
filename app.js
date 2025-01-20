const express = require('express')
const app = express()
const path = require('path')
const PORT = 8000
const db = require('./app/models/database')
const cors = require('cors')


//MIDDLEWARE  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:5173'
}))

//ROUTE IMAGE
app.use('/img', express.static(path.join(__dirname, './public/img')))

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