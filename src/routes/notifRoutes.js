const express = require('express')
const router = express.Router()
const NotificationController = require('../controllers/NotifControllers')

router.put('/update/:id',NotificationController.update)

module.exports = router
