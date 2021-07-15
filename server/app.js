const express = require('express')
const path = require('path')
const connect = require('./db/connect')
const dotenv = require('dotenv')
const cors = require('cors')

const indexRouter = require('./routers/indexRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', indexRouter)

module.exports = app
