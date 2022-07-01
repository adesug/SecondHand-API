const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')
const multer = require('multer')
const storage = require('../helpers/multerStorage.helper')
const {
    authentication
  } = require('../helpers/authMiddlewares.helper')

const fs = require('fs');
const upload = multer({
    storage,
    limits : {
        fileSize : 10000000
    },
    fileFilter: (req,file,cb) => {
        if(file.mimetype.match('image')) {
            cb(null, true)
        }else {
            cb(Error, false)
        }
    }
})

router.put('/update/:id',upload.single('foto_profil'),authentication,UserController.update)

module.exports = router