const express = require('express')
const testController = require('@controller/testController')

const router = express.Router()
// const bodyParser = require('body-parser')
// router.use(bodyParser.urlencoded({
//     extended: false
// }));
// router.use(bodyParser.json())

// test routes
router.post('/p', testController.index_test)

module.exports = router