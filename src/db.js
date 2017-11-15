'use strict'

const mongoose = require('mongoose')
const debug = require('debug')
const log = debug('another-todo:database')
const error = debug('another-todo:database:error')

const DB_URI = process.env.DB_URI || 'mongodb://localhost/another-todo'

const db = {

  connect () {
    return mongoose.connect(DB_URI)
  },

  disconnect () {
    return mongoose.connection.close(() => {
      process.exit(0)
    })
  }
}

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
  log('Mongoose connection open to ' + DB_URI)
})

mongoose.connection.on('disconnected', () => {
  log('Mongoose disconnected')
})

mongoose.connection.on('error', (err) => {
  error(err)
})

process
  .on('SIGINT', db.disconnect)
  .on('SIGTERM', db.disconnect)

module.exports = db
