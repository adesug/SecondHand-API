const express = require('express')
const router = express.Router()
const PenawaranController = require('../controllers/penawaranControllers')

const {
    authentication
} = require('../helpers/authMiddlewares.helper')

router.post('/menawar', authentication, PenawaranController.create)
router.put('/update', authentication, PenawaranController.updatePenawaran)
router.get('/list-seller',authentication,PenawaranController.listSeller)
router.get('/list-buyer', authentication, PenawaranController.listBuyer)
module.exports = router