const { User } = require('../models/index')

class UpdateUserController {
    static async update(req,res,next) {
        try {
            const {id} = req.params;
            const {body} = req;
            let findUser = await User.findOne({
                where: {
                    id,
                }
            })
            if(findUser == null) {
                res.status(404).send({
                    message : "Data user is not found",
                    status : 404,
                })
            }else {
                 User.update(body,{
                    where : {
                        id,
                    }
                })
                res.status(200).send({
                    message : "Successfully update data user",
                    status : 200,
                    findUser
                })
            }
        } catch (err) {
            next(err)
        }

      
    }
    
}
module.exports = UpdateUserController