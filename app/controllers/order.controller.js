const db = require('../models/database')
const Order = db.orders

//MENDAPATKAN SEMUA PRODUK
exports.getAllOrder = async (req, res) => {
  const id = Number(req.params.id)
  try {
    //MENGGUNAKAN MongoDB AGGREGATION
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



//MENAMBAHKAN ORDER
exports.createOrder = async (req, res) => {
  const id = Number(req.params.id)
  const productCode = String(req.body.product)

  try {
    //CARI DOKUMEN BERDASARKAN user_id
    const existingOrder = await Order.findOne({ user_id: id })
    if (existingOrder && existingOrder.cart_items.includes(productCode)) {
      return res.status(409).send({
        message: "PRODUCT ALREADY EXIST"
      })
    }

    const result = await Order.updateOne(
      {
        user_id: id //FILTER BERDASARKAN ID
      },
      {
        $addToSet: { cart_items: productCode } // MENAMBAHKAN productCode ke cart_items
      },
      {
        upsert: true // MEMBUAT DOKUMEN BARU JIKA TIDAK ADA user_id yang cocok
      }
    )

    //KIRIM RESPON JIKA OPERASI BERHASIL
    res.status(200).send({
      message: 'ORDER UPDATE SUCCESFULLY',
      result
    })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'AN  ERROR OCCURRED WHILE CREATING THE ORDER.'
    })
  }
}


exports.removeFromOrder = async (req, res) => {
  const id = Number(req.params.id)
  const productCode = String(req.params.codeProduct)

  try {
    const result = await Order.updateOne(
      {
        user_id: id //FILTER BERDASARKAN ID
      },
      {
        $pull: { cart_items: productCode } // MENAMBAHKAN productCode ke cart_items
      }
    )

    //KIRIM RESPON JIKA OPERASI BERHASIL
    res.status(200).send({
      message: 'ORDER DELETE SUCCESFULLY',
      result
    })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'AN  ERROR OCCURRED WHILE REMOVE THE ORDER.'
    })
  }
}