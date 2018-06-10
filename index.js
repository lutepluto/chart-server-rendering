const express = require('express')
const logger = require('morgan')
const createError = require('http-errors')

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.get('/', function(req, res, next) {
  res.json({
    code: 0,
    message: ''
  })
})

// catch 404
app.use(function(req, res, next) {
  next(createError(404))
})

app.listen(3000, function() {
  console.log('Server started listening on 3000...')
})
