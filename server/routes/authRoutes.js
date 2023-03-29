const express = require('express')
const { register, login, logout } = require('../controller/authRoutes.js')


const routes = express.Router()


routes.post('/register', register)
routes.post('/login', login)
routes.post('/logout/:id', logout)

module.exports = routes