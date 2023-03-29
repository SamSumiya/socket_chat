// import express from 'express'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import helmet from 'helmet'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import morgan from 'morgan'
// import authRoutes from './routes/authRoutes.js'

// import messageRoutes from './routes/messageRoutes.js'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const messageRoutes = require('./routes/messageRoutes')
const authRoutes = require('./routes/authRoutes')
const avatarRoutes = require('./routes/avatarRoutes')
const userRoutes = require('./routes/userRoutes')
const socket = require('socket.io')
require('dotenv').config()

// Configure
const app = express()
app.use(express.json())
app.use(cors())
// app.use(helmet())
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(morgan('dev'))

// Routes
app.use('/api/auth/', authRoutes)
app.use('/api/avatar', avatarRoutes)
app.use('/api/user', userRoutes)
app.use('/api/messages', messageRoutes)

// Mongoose Setup
mongoose
  .connect(
    process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Connected to MongoDB database successfully!')
  })
  .catch((error) => console.log(`${error} did not connect`))
  .finally(() => {
    console.log('This is socket chat app')
  })

const server = app.listen(process.env.LOCAL_PORT || 8080, () => {
  console.log(`PORT listening on port ${process.env.LOCAL_PORT}`)
})

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on('send-message', (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('message-recieved', data.message)
    }
  })
})
