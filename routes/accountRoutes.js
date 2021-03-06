const express = require('express')
const accountController = require('@controller/accountController')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

// test routes
router.post('/register', accountController.registerAccount)
router.post('/fetch', accountController.fetchAccount)
router.post('/updateLocation', accountController.updateLocation)
router.post('/updateRegistrationToken', accountController.updateRegistrationToken)

module.exports = router