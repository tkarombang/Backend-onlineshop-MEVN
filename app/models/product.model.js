const mongoose = require('mongoose')
module.exports = mongoose => {
  const schema = mongoose.Schema({
    code: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    averageRating: { type: Number, default: 0 }
  }, { versionKey: false })

  schema.set('toJSON', { getters: true })

  schema.method("toJSON", function () {
    const { versionKey, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Product = mongoose.model("products", schema)
  return Product
}