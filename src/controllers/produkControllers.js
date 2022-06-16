const { Product } = require('../models')
const cloudinary = require('../config/cloudinary.service')
  

class ProductController {
  static async create(req, res, next) {
    
    try {
    //  console.log(req.files)
    // const result1 = await cloudinary.uploader.upload(req.files.foto_produk_1.path);
    // console.log(result1);

           const foto_produk_1 = await cloudinary.uploader.upload(req.files.foto_produk_1[0].path);
           const foto_produk_2 = await cloudinary.uploader.upload(req.files.foto_produk_2[0].path);
           const foto_produk_3 = await cloudinary.uploader.upload(req.files.foto_produk_3[0].path);
        
      await Product.create({
        nama: req.body.nama,
        user_id: req.body.user_id,
        harga: req.body.harga,
        kategori_id_1: req.body.kategori_id_1,
        kategori_id_2: req.body.kategori_id_2,
        kategori_id_3: req.body.kategori_id_3,
        kategori_id_4: req.body.kategori_id_4,
        kategori_id_5: req.body.kategori_id_5,
        deskripsi: req.body.deskripsi,
        foto_produk_1:  foto_produk_1.secure_url,
        foto_produk_2: foto_produk_2.secure_url,
        foto_produk_3: foto_produk_3.secure_url,
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