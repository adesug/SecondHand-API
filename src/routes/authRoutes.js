const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authControllers')
const { userValidationRules, userValidationLogin,validate } = require('../helpers/validator.helper')

router.post('/register',userValidationRules(), validate, AuthController.register)
//ade
router.post('/login', userValidationLogin(), validate,AuthController.login)

module.exports = router