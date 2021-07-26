const express = require('express')
const path = require('path')
const connect = require('./db/connect')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware.js')

const routerAuth = require('./routers/index.js')
const indexRouter = require('./routers/indexRouter')
const analysesRouter = require('./routers/analysesRouter.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'https://pet-sync.herokuapp.com/',
  })
)

app.use('/api', routerAuth)
app.use('/', indexRouter)
app.use('/analyses', analysesRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'))
})

app.use(errorMiddleware)

module.exports = app
