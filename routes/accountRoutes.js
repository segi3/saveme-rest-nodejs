const express = require('express')
const accountController = require('@controller/accountController')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

// test routes
router.post('/register', accountController.registerAccount)

module.exports = router