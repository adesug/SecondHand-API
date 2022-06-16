const { Product } = require('../models')

class ProductController {
  static async create(req, res, next) {
    // console.log(req.body)
    try {
        if (req.files) {
          req.body.foto_produk_1 = `http://localhost:3000/${req.files.foto_produk_1[0].filename}`,
          req.body.foto_produk_2 = `http://localhost:3000/${req.files.foto_produk_2[0].filename}`,
          req.body.foto_produk_3 = `http://localhost:3000/${req.files.foto_produk_3[0].filename}`
          // console.log(req.files)
        }
      await Product.create({
        nama: req.body.nama,
        user_id: req.body.user_id,
        harga: req.body.harga,
        kategori_id: req.body.kategori_id,
        deskripsi: req.body.deskripsi,
        status: req.body.status,
        foto_produk_1: req.body.foto_produk_1,
        foto_produk_2: req.body.foto_produk_2,
        foto_produk_3: req.body.foto_produk_3
      })
      res.status(200).json({
        message: 'Successfully create product'
      })
    } catch(err) {
      next(err)
    }
  }
  static async list(req, res, next) {
    try {
      const movies = await Product.findAll()
      res.status(200).json(movies)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = ProductController