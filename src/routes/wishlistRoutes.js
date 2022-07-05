const express = require('express')
const router = express.Router()
const WishlistController = require ('../controllers/wishlistControllers')
const {
    authentication
  } = require('../helpers/authMiddlewares.helper')
 
router.post('/create', authentication, WishlistController.create)
router.get('/list',authentication,WishlistController.list)
router.delete('/delete/:id',authentication,WishlistController.delete)

module.exports = router

