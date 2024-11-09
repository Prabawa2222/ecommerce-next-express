const router = require('express').Router()
const userController = require('../users/userController')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)

module.exports = router