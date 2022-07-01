const {
    Penawaran,
    Product,
    Notification,
    User
} = require('../models')
const UpdateUserController = require('./userControllers')


class PenawaranController {
    static async create(req, res, next) {
        try {
            let findProduct = await Product.findOne({
                where: {
                    id: req.body.produk_id,
                },
                include: [{
                    model: User,
                    as: 'user'
                }],
            })
            let notif
            if (findProduct == null) {
                res.status(404).send({
                    message: "Data Product is not found",
                    status: 404,
                })
            } else {
                await Penawaran.create({
                    produk_id: req.body.produk_id,
                    user_id_buyer: req.user.id,
                    harga_penawaran: req.body.harga_penawaran,
                    user_id_seller: findProduct.user_id,
                })

                notif = await Notification.create({
                    produk_id: req.body.produk_id,
                    user_id_buyer: req.user.id,
                    user_id_seller: findProduct.user_id,
                    status: 'penawaran'
                })
            }
            res.status(200).json({
                message: "success",
                status: 200,
                findProduct,
                notif
            })
        } catch (err) {
            next(err)
        }
    }
    //update penawaran diterima atau tidak
    static async updatePenawaran(req, res, next) {
        try {
            const penawaran = await Penawaran.findOne({
                where: {
                    user_id_seller: req.user.id,
                    id: req.query.id
                }
            })
            if (!penawaran) {
                throw {
                    status: 404,
                    message: 'Penawaran is not found'
                }
            } else {
                await Penawaran.update({
                    status: req.body.status,
                }, {
                    where: {
                        user_id_seller: req.user.id,
                        id: req.query.id
                    },
                })
                let notif = await Notification.create({
                    produk_id: req.body.produk_id,
                    user_id_buyer: penawaran.user_id_buyer,
                    user_id_seller: req.user.id,
                    status: 'penawaran'
                })
                res.status(200).json({
                    message: 'Successfully update product',
                    notif,
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async listSeller(req, res, next) {
        try {
            const penawaran = await Penawaran.findAll({
                where: {
                    user_id_seller: req.user.id
                }
            })
            if (penawaran) {
                res.status(200).json({
                    penawaran
                })
            } else {
                res.status(404).json({
                    message:'Penawaran not found'
                })
            }

        } catch (err) {
            next(err)
        }
    }
    static async listBuyer(req, res, next) {
        try {
            const penawaran = await Penawaran.findAll({
                where: {
                    user_id_buyer: req.user.id
                }
            })
            if (penawaran) {
                res.status(200).json({
                    penawaran
                })
            } else {
                res.status(404).json({
                    message: 'Penawaran not found'
                })
            }

        } catch (err) {
            next(err)
        }
    }
}
module.exports = PenawaranController