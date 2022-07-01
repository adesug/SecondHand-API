const {
    Notification
} = require('../models')

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
}

module.exports = NotificationController