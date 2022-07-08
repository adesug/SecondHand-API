const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryControllers')

router.get('/category', CategoryController.list)

module.exports = router
