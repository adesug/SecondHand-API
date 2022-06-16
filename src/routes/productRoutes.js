const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/produkControllers')
const multer = require('multer')
const storage = require('../helpers/multerStorage.helper')

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





router.post('/create',upload.fields([{
           name: 'foto_produk_1', maxCount: 1
         }, {
           name: 'foto_produk_2', maxCount: 1
         },{
           name: 'foto_produk_3', maxCount: 1
         }]), ProductController.create)




module.exports = router