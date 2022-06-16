const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')

router.put('/update/:id', UserController.update)

module.exports = router