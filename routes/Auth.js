const router = require('express').Router()
const SignupUser = require('../controllers/Auth/Signup')
const LoginUser = require('../controllers/Auth/Login')
const Logout = require('../controllers/Auth/Logout')

const authRequired = require("../middleware/requiredAuth")

router.post('/signup', SignupUser)
router.post('/login', LoginUser)
router.get("/logout",authRequired,Logout)

module.exports = router