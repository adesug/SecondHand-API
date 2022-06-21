const jwt = require('jsonwebtoken')
const { User, Admin } = require('../models')

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: 'Unauthorized request'
      }
    } else {
      const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const user = await User.findOne({
        where: {
          id: payload.id,
          email: payload.email
        }
      })
      if (user) {
        req.user = payload
        next()
      } else {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      }
    }
  } catch(err) {
    next(err)
  }
}


module.exports = {
  authentication
}
