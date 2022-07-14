const {
    Notification
} = require('../models')
const {
    Op
  } = require('sequelize')

class NotificationController {
    static async update (req,res,next){
        try {
            const {id} = req.params;
            const {body} = req;
            let findNotif = await Notification.findOne({
                where : {
                    id,
                }
            })
            if(findNotif ===  null) {
                res.status(400).send({
                    message: 'Update notif is error',
                    status: 404,
                    error: "data is not found"
                })
            }else {
               await Notification.update({
                status_baca : 'read'}, {
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
    static async  listBelumTerbaca(req,res,next) {
        try {
            const dataNotif = await Notification.findAll({
                where:{
                    status_baca : "unread",
                    [Op.or]: [
                        {user_id_seller : req.user.id},
                        {user_id_buyer : req.user.id}
                    ]
                   
                }
            })
            res.status(200).json({
                dataNotif
            })
        } catch (err) {
            next(err)
        }
    } 
}

module.exports = NotificationController