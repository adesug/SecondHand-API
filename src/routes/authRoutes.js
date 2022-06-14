const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authControllers')
const { userValidationRules, validate } = require('../helpers/validator.helper')

router.post('/register',userValidationRules(), validate, AuthController.register)
//ade
router.post('/login',AuthController.login)

module.exports = router