const { Wishlist, Product, Category} = require('../models')
const jwt = require('jsonwebtoken')

class WishlistController {
    static async create(req,res,next) {
        try {
            const product = await Product.findOne({
                where : {
                    id : req.body.produk_id
                }
            })
            if(!product) {
                res.status(404).json({
                    "status" : 404,
                    "message" : 'Produk Not Found'
                })
            }
            await Wishlist.create({
                user_id : req.user.id,
                produk_id : req.body.produk_id,
            })
            res.status(200).json({
                message : 'Successfullt add wishlist',
                Wishlist
            })
        } catch (err) {
            next(err)
        }
    }
    static async list(req,res,next) {
        try {
        let data = await Wishlist.findAll({
                attributes: ['id'],
                where: {
                    user_id : req.user.id
                }, 
                include: {
                    model: Product,
                    as:"produk",
                    include : {
                        model : Category,
                        as:"kategori_1"
                    }
                }
            })
            let wishlist = []
            data = JSON.stringify(data)
            data =JSON.parse(data)
            console.log(data[0].produk);
            for (let i = 0; i < data.length; i++) {
                if(data[i].produk.kategori_1 !== null) {
                    let obj = {
                        id_wishlist : data[i].id,
                        id_produk : data[i].produk.id,
                        nama:  data[i].produk.nama,
                        kategori_1 : data[i].produk.kategori_1.nama,
                        harga : data[i].produk.harga,
                        foto_produk_1 : data[i].produk.foto_produk_1
                    }
                    wishlist.push(obj)
                }
               
            }
            res.status(200).json(wishlist)
        } catch (err) {
            next(err)
        }
    }
    static async delete(req,res,next) {
        const{id} = req.params;
        try {
            let findWishlist = await Wishlist.findOne({
                where : {
                    id
                }
            })
            if(findWishlist == null)
            {
                res.status(400).send({
                    message : 'Delete is error',
                    status : 404,
                    error : 'Data is not found'
                })
            }else {
                Wishlist.destroy({
                    where: ({
                        id
                    })
                })
                res.status(200).send({
                    message: 'Success deleted',
                    status: 200,
                    findWishlist
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = WishlistController

