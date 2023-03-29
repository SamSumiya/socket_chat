const express = require('express')
const { addMessage, getMessages }  = require( '../controller/messageRoutes.js')

const routes = express.Router()


routes.post('/add', addMessage)
routes.post('/get', getMessages)

module.exports = routes