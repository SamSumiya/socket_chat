const express = require('express')
const { createNewUserImage } = require('../controller/avatarRoutes.js') 

const routes = express.Router()


routes.post('/:id', createNewUserImage)

module.exports = routes