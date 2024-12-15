const express = require('express')
const app = express()
const PORT = 8000
const db = require('./app/models/dabatase')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.json({
    message: "welcome to onlineshope server"
  })
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})