const express = require('express')
const logger = require('morgan')
const createError = require('http-errors')
const printer = require('./printer')

const app = express()

app.use(logger('dev'))
app.use(express.json())

app.post('/api/chart', function(req, res, next) {
  const config = req.body.config
  try {
    const name = printer(config)
    res.json({
      code: 0,
      data: { name }
    })
  } catch (e) {
    console.error(`Generating chart image failed - ${e.message}`)
    res.json({
      code: 500,
      message: e.message
    })
  }
})

// catch 404
app.use(function(req, res, next) {
  next(createError(404))
})

app.listen(3000, function() {
  console.log('Server started listening on 3000...')
})
