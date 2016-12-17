const express = require('express')
const logger = require('morgan')
const app = express()
const v1 = require('./v1')

/**
 * Middlewares
 */
app.use(logger('dev'))

/**
 * Ensure JSON acceptance
 */
app.use((req, res, next) => {
  let err

  if (!req.accepts('json')) {
    err = new Error('Not Acceptable')
    err.status = 406
  }

  return next(err)
})

/**
 * Routes
 */
app.use('/v1', v1)

/**
 * ErrorHandler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      message: err.message,
      stack: err.stack
    })
})

module.exports = app
