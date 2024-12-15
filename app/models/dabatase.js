const dbConfig = require('../../config/db_config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

mongoose.connect(db.url)
  .then(() => {
    console.log('Koneksi database berhasil!')
  }).catch((err) => {
    console.log('Koneksi database Gagal:', err)
    process.exit()
  })


db.products = require('./product.model')(mongoose)

module.exports = db