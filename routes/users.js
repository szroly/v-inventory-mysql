const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')


router.post('/login', usersController.login)

router.post('/logout', usersController.logout)

router.get('/login/check', usersController.loginCheck)

router.post('/login/refresh', usersController.refreshToken)

module.exports = router