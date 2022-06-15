const express = require('express')
const router = express.Router()
const authRoutes = require('../routes/authRoutes')
const productRoutes = require('../routes/productRoutes')
const errorHandler = require('../helpers/errorHandler.helper')



//aku tambahin /api
router.use('/api/auth', authRoutes)
router.use('/api/product', productRoutes)
router.use(errorHandler)

module.exports = router