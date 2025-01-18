const db = require('../models/database')
const Order = db.orders

exports.getAllOrder = async (req, res) => {
  const id = Number(req.params.id)

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          user_id: id //FILTER BERDASARKAN user_id
        },
      },
      {
        $lookup: {
          from: "products", //KOLEKSI YANG DIGABUNG
          localField: "cart_items", //FIELD DI ORDERS
          foreignField: "code", //FIELD DI PRODUCTS
          as: "products" //NAMA HASIL GABUNGAN
        }
      }
    ])

    //KIRIMKAN HASIL JIKA BERHASIL
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).send({ message: error.message || 'SOME ERROR WHILE RETRIEVING ORDERS.' })
  }
}