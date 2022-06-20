const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail().withMessage('must be be an email'),
    // password must be at least 5 chars long
    body('password').isLength({ min: 10 }).withMessage('must be at least 10 chars long'),
  ]
}

const userValidationLogin = () => {
  return [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ]
}

const validateCreateProduk = (req, res, next) => {
  return [
    body('nama').notEmpty().withMessage('Nama Harus diisi!'),
    body('kategori_id_1').notEmpty().withMessage('kategori minimal 1!'),
    body('harga').notEmpty().withMessage('Harga harus diisi!'),
    body('deskripsi').notEmpty.withMessage('Deskripsi harus diisi'),
    body('foto_produk_1').notEmpty('Foto minimal 1')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}



module.exports = {
  userValidationRules,
  userValidationLogin,
  validate,
  validateCreateProduk,
}