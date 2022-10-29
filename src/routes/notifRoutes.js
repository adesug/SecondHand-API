const express = require('express')
const router = express.Router()
const NotificationController = require('../controllers/NotifControllers')
const {
    authentication
  } = require('../helpers/authMiddlewares.helper')

router.put('/update/:id',NotificationController.update)
router.get('/unread', authentication, NotificationController.listBelumTerbaca)

module.exports = router
