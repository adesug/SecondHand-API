const express = require('express')
const router = express.Router()
const PenawaranController = require('../controllers/penawaranControllers')

const {
    authentication
} = require('../helpers/authMiddlewares.helper')

router.post('/menawar', authentication,  PenawaranController.create)


module.exports = router