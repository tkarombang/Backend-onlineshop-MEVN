const db = require('../models/database')
const Product = db.products

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products)
  } catch (error) {
    res.status(500).send({ message: error.message || 'SOME ERROR OCCURED WHILE RETRIEVING PRODUCTS.', })
  }
}