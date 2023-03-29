const express = require('express')
const { getAllContacts }= require( '../controller/userRoutes.js')


const routes = express.Router()

routes.get('/contacts/:id', getAllContacts)



module.exports = routes