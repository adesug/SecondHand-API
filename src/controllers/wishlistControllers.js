const { Wishlist, Product,Category} = require('../models')
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
            const data = await Wishlist.findAll({
                attributes: ['id'],
                where: {
                    user_id : req.user.id
                }, include: {
                    model: Product,
                    as: "produk",
                    include: {
                        model: Category,
                        as:"kategori_1"
                    }
                }
            })
            const wishlist = []
            for (let i = 0; i < data.length; i++) {
                wishlist.push(data[i].produk)
            }
            res.status(200).json(data)
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

