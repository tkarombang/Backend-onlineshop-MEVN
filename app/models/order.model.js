const mongoose = require('mongoose')
module.exports = mongoose => {
  const schema = mongoose.Schema({
    user_id: {
      type: Number,
      require: true
    },
    cart_items: {
      type: [String],
      require: true
    }
  }, { timestamps: true })


  // MENAMBAHKAN METODE CUSTOM UNTUK MENGUBAH OUTPUT JSON
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject() // __v adalah version key default
    object.id = _id // ganti _id dengan id
    return object
  })

  const Order = mongoose.model('orders', schema)
  return Order
}