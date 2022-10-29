const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

      const userAfterCreate = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (userAfterCreate) {
        if(bcrypt.compareSync(req.body.password, userAfterCreate.password)){
          const token = jwt.sign({
            id: userAfterCreate.id,
            email: userAfterCreate.email
            
          }, process.env.JWT_SECRET)
          res.status(200).json({
            message:'Successfully Create User',
            token,
          })
        }else{
          throw {
            status: 400,
            message: 'Invalid username or password'
          }
        }
      }else {
        throw {
          status : 400,
          message : 'Invalid username or password'
        }
      }
    } catch (err) {
      next(err)
    }
  }
  //ade
  static async login (req,res,next) {
    try {
      const user = await User.findOne ({
        where: {
          email : req.body.email
        }
      })
      if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)){
          const token = jwt.sign({
            id: user.id,
            email: user.email
            
          }, process.env.JWT_SECRET)
          res.status(200).json({
            token,
          })
        }else{
          throw {
            status: 400,
            message: 'Invalid username or password'
          }
        }
      }else {
        throw {
          status : 400,
          message : 'Invalid username or password'
        }
      }
    } catch (err) {
      next(err)
    }
  }


}


require('dotenv').config()
module.exports = AuthController