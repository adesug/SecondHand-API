const {
  Product,
  Category,
  User,
} = require('../models')
const {
  Op
} = require('sequelize')
const jwt = require('jsonwebtoken')
const cloudinary = require('../config/cloudinary.service')



class ProductController {
  static async create(req, res, next) {

    try {
      const user = await User.findOne({
        where: {
          id: req.user.id
        }

      })
      // console.log(user.nama);
      if (user.foto_profil != null && user.kota != null && user.alamat != null && user.telp != null) {
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
            status: req.body.status,
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
            status: req.body.status,
            foto_produk_1: foto_produk_1.secure_url,
            foto_produk_2: foto_produk_2.secure_url,
          })
          res.status(200).json({
            message: 'Successfully create product'
          })
        } else if (req.files.foto_produk_1) {
          const foto_produk_1 = await cloudinary.uploader.upload(req.files.foto_produk_1[0].path);
          const product = await Product.create({
            nama: req.body.nama,
            user_id: req.user.id,
            harga: req.body.harga,
            kategori_id_1: req.body.kategori_id_1,
            kategori_id_2: req.body.kategori_id_2,
            kategori_id_3: req.body.kategori_id_3,
            kategori_id_4: req.body.kategori_id_4,
            kategori_id_5: req.body.kategori_id_5,
            deskripsi: req.body.deskripsi,
            status: req.body.status,
            foto_produk_1: foto_produk_1.secure_url,
          })
          let notif;
          if (product.status === 'terbit') {
            notif = await Notification.create({
              produk_id: product.id,
              user_id_seller: req.user.id,
              status: 'terbit'
            })
            res.status(200).json({
              message: 'Successfully create product',
              notif
            })
          } else {
            res.status(200).json({
              message: 'Successfully create product in preview',
            })
          }

        } else {
          res.status(400).json({
            message: 'Foto Produk Minimal 1'
          })
        }
      } else {
        res.status(404).json({
          message: 'Lengkapi data diri !'
        })
      }

    } catch (err) {
      next(err)
    }
  }

  static async list(req, res, next) {
    try {
      if (!req.headers.authorization) {
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
          where: {
            [Op.or]: [{
              kategori_id_1: req.query.id
            }, {
              kategori_id_2: req.query.id
            }, {
              kategori_id_3: req.query.id
            }, {
              kategori_id_4: req.query.id
            }, {
              kategori_id_5: req.query.id
            }]
          },
          include: [{
              model: Category,
              as: 'kategori_1'
            },
            {
              model: Category,
              as: 'kategori_2'
            },
            {
              model: Category,
              as: 'kategori_3'
            },
            {
              model: Category,
              as: 'kategori_4'
            },
            {
              model: Category,
              as: 'kategori_5'
            }
          ],
          limit: size,
          offset: page * size
        })
        res.status(200).json({
          content: product.rows,
          totalPages: Math.ceil(product.count / size)
        })
      } else {
        const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({
          where: {
            id: payload.id,
            email: payload.email
          }
        })
        if (user) {
          req.user = payload
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
            where: {
              [Op.not]: [{
                user_id: req.user.id
              }],
              [Op.or]: [{
                kategori_id_1: req.query.id
              }, {
                kategori_id_2: req.query.id
              }, {
                kategori_id_3: req.query.id
              }, {
                kategori_id_4: req.query.id
              }, {
                kategori_id_5: req.query.id
              }]
            },
            include: [{
                model: Category,
                as: 'kategori_1'
              },
              {
                model: Category,
                as: 'kategori_2'
              },
              {
                model: Category,
                as: 'kategori_3'
              },
              {
                model: Category,
                as: 'kategori_4'
              },
              {
                model: Category,
                as: 'kategori_5'
              }
            ],
            limit: size,
            offset: page * size
          })

          res.status(200).json({
            content: product.rows,
            totalPages: Math.ceil(product.count / size)
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async listIdUser(req, res, next) {
    try {
      const product = await Product.findAll({
        where: {
          user_id: req.user.id
        },
        include: [{
            model: Category,
            as: 'kategori_1'
          },
          {
            model: Category,
            as: 'kategori_2'
          },
          {
            model: Category,
            as: 'kategori_3'
          },
          {
            model: Category,
            as: 'kategori_4'
          },
          {
            model: Category,
            as: 'kategori_5'
          }
        ],
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
  static async updateProduk(req, res, next) {
    try {
      const produk = await Product.findOne({
        where: {
          user_id: req.user.id,
          id: req.params.id
        }
      })
      if (!produk) {
        throw {
          status: 404,
          message: 'Product is not found'
        }
      } else {
        await Product.update({
          status: req.body.status
        }, {
          where: {
            user_id: req.user.id,
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
  static async listAll(req, res, next) {
    try {
      if (!req.headers.authorization) {
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
          include: [{
              model: Category,
              as: 'kategori_1'
            },
            {
              model: Category,
              as: 'kategori_2'
            },
            {
              model: Category,
              as: 'kategori_3'
            },
            {
              model: Category,
              as: 'kategori_4'
            },
            {
              model: Category,
              as: 'kategori_5'
            }
          ],
          limit: size,
          offset: page * size
        })
        res.status(200).json({
          content: product.rows,
          totalPages: Math.ceil(product.count / size)
        })
      } else {
        const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({
          where: {
            id: payload.id,
            email: payload.email
          }
        })
        if (user) {
          req.user = payload
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
            where: {
              [Op.not]: [{
                user_id: req.user.id
              }]
            },
            include: [{
                model: Category,
                as: 'kategori_1'
              },
              {
                model: Category,
                as: 'kategori_2'
              },
              {
                model: Category,
                as: 'kategori_3'
              },
              {
                model: Category,
                as: 'kategori_4'
              },
              {
                model: Category,
                as: 'kategori_5'
              }
            ],
            limit: size,
            offset: page * size
          })

          res.status(200).json({
            content: product.rows,
            totalPages: Math.ceil(product.count / size)
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async listIdProduct(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.query.id
        },
        include: [{
            model: Category,
            as: 'kategori_1'
          },
          {
            model: Category,
            as: 'kategori_2'
          },
          {
            model: Category,
            as: 'kategori_3'
          },
          {
            model: Category,
            as: 'kategori_4'
          },
          {
            model: Category,
            as: 'kategori_5'
          }
        ],
      })
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async getTerjual(req, res, next) {
    try {
      const product = await Product.findAll({
        where: {
          status: 'terjual',
          user_id: req.user.id
        },
        include: [{
            model: Category,
            as: 'kategori_1'
          },
          {
            model: Category,
            as: 'kategori_2'
          },
          {
            model: Category,
            as: 'kategori_3'
          },
          {
            model: Category,
            as: 'kategori_4'
          },
          {
            model: Category,
            as: 'kategori_5'
          }
        ]
      })
      res.status(200).json({
        product
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ProductController