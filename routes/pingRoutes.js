const express = require('express')
const pingController = require('@controller/pingController')

const router = express.Router()

// ping routes
router.post('/ping', pingController.pingOthers)

module.exports = router