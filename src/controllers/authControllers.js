const { User } = require('../models')
const bcrypt = require('bcryptjs')

class AuthController {
  static async register(req, res, next) {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)

      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
console.log(user)
      if (user) {
        throw {
          status: 400,
          message: 'Email already used'
        }
      }

        await User.create({
        nama:req.body.nama,
        email: req.body.email,
        password: hash
      })

      res.status(200).json({
        message: 'Successfully create user'
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = AuthController