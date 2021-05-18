const express = require('express')
const testController = require('@controller/testController')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

// test routes
router.post('/p', testController.index_test)
router.post('/file', upload.single('file'), testController.file_test)
router.get('/dl', testController.file_download)

module.exports = router