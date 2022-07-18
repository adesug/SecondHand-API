const { User } = require('../models/index')
const cloudinary = require('../config/cloudinary.service')

class UpdateUserController {
    static async update(req,res,next) {
        try {
            // const {id} = req.params;
            // const foto_profil = await cloudinary.uploader.upload(req.file.path);
            const {body} = req;
            let newData = {
                ...body,
                // foto_profil: foto_profil.secure_url    
            }
            console.log(newData);
            let findUser = await User.findOne({
                where : {
                    id : req.user.id
                }
            })
            if(findUser == null) {
                res.status(404).send({
                    message : "Data user is not found",
                    status : 404,
                })
            }else {
             await User.update(newData,{
                    where : {
                        id : req.user.id
                    }
                })
                const resObject = {...findUser.dataValues, ...body}
                res.status(200).send({
                    message : "Successfully update data user",
                    status : 200,
                    resObject
                })
            }
        } catch (err) {
            next(err)
        } 
    } 

    static async detail(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    nama:req.params.nama
                }
            })
            res.status(200).json({
                nama: user.nama,
                email: user.email,
                foto_profil: user.foto_profil,
                kota: user.kota,
                alamat: user.alamat,
                telp:user.telp
            })
        } catch (err) {
            next(err)
        }
    }
}
module.exports = UpdateUserController