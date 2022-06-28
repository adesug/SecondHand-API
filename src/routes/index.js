const express = require('express')
const router = express.Router()
const authRoutes = require('../routes/authRoutes')
const productRoutes = require('../routes/productRoutes')
const userRoutes = require('../routes/userRoutes')
const penawaranRoutes = require('../routes/penawaranRoutes')
const errorHandler = require('../helpers/errorHandler.helper')



//aku tambahin /api
router.use('/api/auth', authRoutes)
router.use('/api/product', productRoutes)
router.use('/api/user', userRoutes)
router.use('/api/penawaran', penawaranRoutes)
router.use(errorHandler)

module.exports = router