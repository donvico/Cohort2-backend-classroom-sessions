const express = require('express')
const { createUser, loginUser, getUser } = require('../controllers/userController')
const auth = require('../middlewares/auth')

const router = express.Router()

// router.route('/users').get().post().delete().put()
router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/user', auth,getUser)
// router.put('/users')
// router.post('/users')
// router.delete('/users')

module.exports = router

