const express = require('express')
const { createUser, loginUser, getUser, getRegisterPage } = require('../controllers/userController.js')
const auth = require('../middlewares/auth')

const router = express.Router()

// router.route('/users').get().post().delete().put()
router.post('/register', createUser)
router.get('/register', getRegisterPage)
router.post('/login', loginUser)
router.get('/login')
router.get('/user', auth, getUser)
// router.put('/users')
// router.post('/users')
// router.delete('/users')

module.exports = router

