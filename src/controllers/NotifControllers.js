const {
    Notification,
    Product,
    Penawaran
} = require('../models')
const {
    Op
} = require('sequelize')

class NotificationController {
    static async update(req, res, next) {
        try {
            const {
                id
            } = req.params;
            const {
                body
            } = req;
            let findNotif = await Notification.findOne({
                where: {
                    id,
                }
            })
            if (findNotif === null) {
                res.status(400).send({
                    message: 'Update notif is error',
                    status: 404,
                    error: "data is not found"
                })
            } else {
                await Notification.update({
                    status_baca: 'read'
                }, {
                    where: {
                        id,
                    }
                })
                res.status(200).send({
                    message: 'Success updated',
                    status: 200,
                    findNotif
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async listBelumTerbaca(req, res, next) {
        try {
            let data = await Notification.findAll({
                where: {
                    status_baca: "unread",
                    // status: 'terbit',
                    [Op.or]: [{
                            user_id_seller: req.user.id
                        },
                        {
                            user_id_buyer: req.user.id
                        }
                    ]
                },
                include: {
                    model: Product,
                    as: 'product',
                }
            })

            let notif = []
            data = JSON.stringify(data);
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].product !== null) {
                    let obj = {
                        id: data[i].id,
                        status_notif:data[i].status,
                        product_id: data[i].product.id,
                        nama_product: data[i].product.nama,
                        user_id: data[i].product.user_id,
                        harga: data[i].product.harga,
                        foto_produk_1: data[i].product.foto_produk_1
                    }
                    notif.push(
                        obj
                    )
                } 
            }
            res.status(200).json({
                notif
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = NotificationController