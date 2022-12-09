const express = require('express')
const router = express.Router()
const songsCtrl = require('../../controllers/api/users')

router.post('/login', songsCtrl.create)


module.exports = router