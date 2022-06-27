const {
  Product,Category, sequelize
} = require('../models')
const cloudinary = require('../config/cloudinary.service')
const {Op} = require("sequelize");


class ProductController {
  static async create(req, res, next) {
    console.log(req.files)
    try {
      if (req.files.foto_produk_1 && req.files.foto_produk_2 && req.files.foto_produk_3) {
        const foto_produk_1 = await cloudinary.uploader.upload(req.files.foto_produk_1[0].path);
        const foto_produk_2 = await cloudinary.uploader.upload(req.files.foto_produk_2[0].path);
        const foto_produk_3 = await cloudinary.uploader.upload(req.files.foto_produk_3[0].path);
        await Product.create({
          nama: req.body.nama,
          user_id: req.user.id,
          harga: req.body.harga,
          kategori_id_1: req.body.kategori_id_1,
          kategori_id_2: req.body.kategori_id_2,
          kategori_id_3: req.body.kategori_id_3,
          kategori_id_4: req.body.kategori_id_4,
          kategori_id_5: req.body.kategori_id_5,
          deskripsi: req.body.deskripsi,
          foto_produk_1: foto_produk_1.secure_url,
          foto_produk_2: foto_produk_2.secure_url,
          foto_produk_3: foto_produk_3.secure_url,
        })
        res.status(200).json({
          message: 'Successfully create product'
        })

      } else if (req.files.foto_produk_1 && req.files.foto_produk_2) {
        const foto_produk_1 = await cloudinary.uploader.upload(req.files.foto_produk_1[0].path);
        const foto_produk_2 = await cloudinary.uploader.upload(req.files.foto_produk_2[0].path);
        await Product.create({
          nama: req.body.nama,
          user_id: req.user.id,
          harga: req.body.harga,
          kategori_id_1: req.body.kategori_id_1,
          kategori_id_2: req.body.kategori_id_2,
          kategori_id_3: req.body.kategori_id_3,
          kategori_id_4: req.body.kategori_id_4,
          kategori_id_5: req.body.kategori_id_5,
          deskripsi: req.body.deskripsi,
          foto_produk_1: foto_produk_1.secure_url,
          foto_produk_2: foto_produk_2.secure_url,
        })
        res.status(200).json({
          message: 'Successfully create product'
        })
      } else if (req.files.foto_produk_1 ) {
        const foto_produk_1 = await cloudinary.uploader.upload(req.files.foto_produk_1[0].path);
        await Product.create({
          nama: req.body.nama,
          user_id: req.user.id,
          harga: req.body.harga,
          kategori_id_1: req.body.kategori_id_1,
          kategori_id_2: req.body.kategori_id_2,
          kategori_id_3: req.body.kategori_id_3,
          kategori_id_4: req.body.kategori_id_4,
          kategori_id_5: req.body.kategori_id_5,
          deskripsi: req.body.deskripsi,
          foto_produk_1: foto_produk_1.secure_url,
        })
        res.status(200).json({
          message: 'Successfully create product'
        })
      }
      else {
        res.status(400).json({
          message:'Foto Produk Minimal 1'
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static async list(req, res, next) {
    try {
          const pageAsNumber = Number.parseInt(req.query.page)
          const sizeAsNumber = Number.parseInt(req.query.size)
          let page = 0;
          let size = 5;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }
      if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
        size = sizeAsNumber;
      }
      const product = await Product.findAndCountAll({
        limit: size,
        offset: page * size
      })

      res.status(200).json({
        content: product.rows,
        totalPages : Math.ceil(product.count/size)
      })
    } catch (err) {
      next(err)
    }
  }

  static async listId(req, res, next) {
    try {
      const product = await Product.findAll({
        where: {
          user_id: req.user.id
        }
      })
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async deleteByUser(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!product) {
        throw {
          status: 404,
          message: 'Product not found'
        }
      } else {
        if (product.user_id !== req.user.id) {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        } else {
          await Product.destroy({
            where: {
              id: req.params.id
            }
          })
          res.status(200).json({
            message: 'Successfully delete Product'
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async deleteAfterSold(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!product) {
        throw {
          status: 404,
          message: 'Product not found'
        }
      } else {
        if (product.user_id !== req.user.id) {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        } else {
          await Product.destroy({
            where: {
              id: req.params.id
            }
          })
          res.status(200).json({
            message: 'Product has been SOLD!'
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async updateProduk(req,res,next) {
    try {
      const produk = await Product.findOne({
        where: {
          userId : req.user.id,
          id: req.params.id
        }
      })
      if(!produk) {
        throw {
          status : 404,
          message: 'Product is not found'
        }
      }else {
        await Product.update(req.body, {
          where: {
            userId : req.user.id,
            id: req.params.id
          }
        })
        res.status(200).json({
          message: 'Successfully update product'
        })
      }
    } catch (err) {
      next(err)
    }
  }
  static async FilterByProductName(req,res,next)  {
   
    try {
      let  {q= ""} = req.query;
      let data = await Product.findAll({
        where: {
          // nama : req.query.nama
          nama : sequelize.where(sequelize.fn('LOWER', sequelize.col('nama')), 'LIKE', `%${q}%`)
        }
      })
      res.status(200).json({
        message : 'Successfully filter by category',
        data

      })
    } catch (err) {
      next(err)
    }
  }
  static async FilterByCategory (req,res,next) {
    try {
      let data  = await Product.findAll(
        {
        // where : {
        //   // kategori_id_1: req.query.kategori_id
        //   [Op.in] : [
        //     {kategori_id_1: 2},
        //     {kategori_id_2: 2},
        //     {kategori_id_3: 2}
        //   ]
        // },
        // where : {
        //   kategori_id_2: req.query.kategori_id
        // },
        where: {
          $or: [{ 
              kategori_id_1: req.query.kategori_id
              
            },
            {
              kategori_id_2: req.query.kategori_id
              
            },
            {
              kategori_id_3: req.query.kategori_id
              
            },
            {
              kategori_id_4: req.query.kategori_id
              
            },
            {
              kategori_id_5: req.query.kategori_id
              
            },
          ]
        },
       
       
        include : [
          {
            model : Category,
            as : 'kategori_1'
          },
          {
            model : Category,
            as : 'kategori_2'
          },
          {
            model : Category,
            as : 'kategori_3'
          },
          {
            model : Category,
            as : 'kategori_4'
          },
          {
            model : Category,
            as : 'kategori_5'
          }
        ]
                 
      })
      res.status(200).json({
        message : "Success",
        data
      });
      
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ProductController