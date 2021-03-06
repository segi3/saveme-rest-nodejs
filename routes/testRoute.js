const express = require('express')
const testController = require('@controller/testController')

const saltedMd5 = require('salted-md5')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

// test routes
router.post('/p', testController.index_test)
router.post('/file', upload.single('file'), testController.file_test)
router.get('/dl', testController.file_download)
router.post('/fcm', testController.fcm_test)

router.post('/hash', (req, res) => {
    res.send({
        string: req.body.string,
        hash: saltedMd5(req.body.string, 'mudahkan kami menyelesaikan project ini')
    })
})

module.exports = router