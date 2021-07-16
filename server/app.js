const express = require('express')
const path = require('path')
const connect = require('./db/connect')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.middleware.js')

const routerAuth = require('./routers/index.js')
const indexRouter = require('./routers/indexRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api', routerAuth)
app.use('/', indexRouter)

app.use(errorMiddleware)

module.exports = app
