const db = require('../models/database')
const Order = db.orders

//MENDAPATKAN SEMUA PRODUK
exports.getAllOrder = async (req, res) => {
  const id = Number(req.params.id)
  try {
    //MENGGUNAKAN MongoDB AGGREGATION
    const orders = await Order.aggregate([
      {
        $match: { user_id: id } //FILTER BERDASARKAN user_id
      },
      {
        $unwind: "$cart_items" // Pisahkan array cart_items menjadi objek individual
      },
      {
        $lookup: {
          from: "products", //KOLEKSI YANG DIGABUNG
          localField: "cart_items.code", //FIELD DI ORDERS
          foreignField: "code", //FIELD DI PRODUCTS
          as: "productDetails" //NAMA HASIL GABUNGAN
        },
      },
      {
        $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } // Biarkan tetap ada meski lookup kosong
      },
      {
        $group: {
          _id: "$_id",
          user_id: { $first: "$user_id" },
          cart_items: { $push: "$cart_items" }, //SIIMPAN cart_items TANPA ARRAY BERSARANG
          products: { $push: "$productDetails" }, //SIMPAN ARRAY DENGAN BENAR
          updatedAt: { $first: "$updatedAt" }
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
    if (existingOrder) {
      const itemIndex = existingOrder.cart_items.findIndex(item => item.code === productCode)
      if (itemIndex > -1) {
        existingOrder.cart_items[itemIndex] += 1
      } else {
        existingOrder.cart_items.push({ code: productCode, quantity: 1 })
      }
      await existingOrder.save();
    } else {
      const newOrder = new existingOrder({
        user_id: id,
        quantity: [{ code: productCode, quantity: 1 }]
      })
      await newOrder.save()
    }

    //KIRIM RESPON JIKA OPERASI BERHASIL
    res.status(200).send({
      message: 'ORDER UPDATE SUCCESFULLY',
      existingOrder
    })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'AN  ERROR OCCURRED WHILE CREATING THE ORDER.'
    })
  }
}

//UPDATE PRODUCT
exports.updateFromOrder = async (req, res) => {
  const id = Number(req.params.id)
  const productCode = String(req.body.product)
  const { quantity } = req.body // JUMLAH YANG DI PERBAHARUI

  try {
    const existingOrder = await Order.findOne({ user_id: id })
    if (!existingOrder) {
      return res.status(404).send({ message: "ORDER NOT FOUND" })
    }
    const item = existingOrder.cart_items.find(item => item.code === productCode)
    if (!item) {
      return res.status(404).send({ message: "PRODUCT NOT FOUND IN CART" })
    }
    if (quantity <= 0) {
      existingOrder.cart_items = existingOrder.cart_items.filter(item => item.code !== productCode)
    } else {
      item.quantity = quantity
    }
    await existingOrder.save()
    res.status(200).send({ message: "QUANTITY UPDATE SUCCESSFULLY", existingOrder })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

//DELETE PRODUCT
exports.removeFromOrder = async (req, res) => {
  const id = Number(req.params.id)
  const productCode = String(req.params.codeProduct)

  try {
    // const result = await Order.updateOne(
    //   {
    //     user_id: id //FILTER BERDASARKAN ID
    //   },
    //   {
    //     $pull: { cart_items: productCode } // MENAMBAHKAN productCode ke cart_items
    //   }
    // )
    const existingOrder = await Order.findOne({ user_id: id })

    if (!existingOrder) {
      return res.status(404).send({ message: "ORDER NOT FOUND" })
    }

    existingOrder.cart_items = existingOrder.cart_items.filter(item => item.code !== productCode)
    //KIRIM RESPON JIKA OPERASI BERHASIL
    await existingOrder.save()
    res.status(200).send({ message: "PRODUCT REMOVED FROM CART", existingOrder })

    // //KIRIM RESPON JIKA OPERASI BERHASIL
    // res.status(200).send({
    //   message: 'ORDER DELETE SUCCESFULLY',
    //   result
    // })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'AN  ERROR OCCURRED WHILE REMOVE THE ORDER.'
    })
  }
}