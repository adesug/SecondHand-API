const {
    Penawaran,
    Product,
    Notification,
    User
} = require('../models')


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
                })

                await Notification.create({
                    produk_id: req.body.produk_id,
                    user_id_buyer: req.user.id,
                    user_id_seller: findProduct.user_id,
                    status : 'penawaran'
                })
            }
            res.status(200).json({
                message: "success",
                status: 200,
                findProduct
            })
        } catch (err) {
            next(err)
        }
    }
}
module.exports = PenawaranController