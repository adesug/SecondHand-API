const express = require('express')
const router = express.Router()
const authRoutes = require('../routes/authRoutes')
const productRoutes = require('../routes/productRoutes')
const userRoutes = require('../routes/userRoutes')
const penawaranRoutes = require('../routes/penawaranRoutes')
const wishlistRoutes = require('../routes/wishlistRoutes')
const notifRoutes = require('../routes/notifRoutes')
const errorHandler = require('../helpers/errorHandler.helper')
const categoryRoutes = require('../routes/categoryRoutes')


//aku tambahin /api
router.use('/api/auth', authRoutes)
router.use('/api/product', productRoutes)
router.use('/api/user', userRoutes)
router.use('/api/penawaran', penawaranRoutes)
router.use('/api/wishlist', wishlistRoutes)
router.use('/api/notif', notifRoutes)
router.use('/api/category', categoryRoutes)
router.use(errorHandler)

module.exports = router