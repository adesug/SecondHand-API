const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/produkControllers')
const multer = require('multer')
const storage = require('../helpers/multerStorage.helper')
const {
  authentication
} = require('../helpers/authMiddlewares.helper')
const {
  validateCreateProduk,
  validate,
} = require('../helpers/validator.helper')

const fs = require('fs');
const upload = multer({
  storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match('image')) {
      cb(null, true)
    } else {
      cb(Error, false)
    }
  }
})


router.post('/create', authentication, upload.fields([{
  name: 'foto_produk_1',
  maxCount: 1
}, {
  name: 'foto_produk_2',
  maxCount: 1
}, {
  name: 'foto_produk_3',
  maxCount: 1
}]), validateCreateProduk(), validate, ProductController.create)


router.get('/list',
  ProductController.list)
router.get('/list-by-id', authentication, ProductController.listId)
router.delete('/deleteByUser/:id', authentication, ProductController.deleteByUser)
router.delete('/delete-after-sold/:id', authentication, ProductController.deleteAfterSold)
router.get('/all',ProductController.listAll)

module.exports = router