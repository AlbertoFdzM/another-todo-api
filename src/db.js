const mongoose = require('mongoose')
const debug = require('debug')
const log = debug('another-todo:database')
const error = debug('another-todo:database:error')

// First I define my DB URI or make my script take it from the env variables
const DB_URI = process.env.DB_URI || 'mongodb://localhost/another-todo'

// Define some basic methods to connect/disconnect to the DB
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

// This let mongoose to use the node's default promises
mongoose.Promise = global.Promise

// Logs for our app
mongoose.connection.on('connected', () => {
  log('Mongoose connection open to ' + DB_URI)
})

// More logs...
mongoose.connection.on('disconnected', () => {
  log('Mongoose disconnected')
})

// Logs that I hope to not see
mongoose.connection.on('error', (err) => {
  error(err)
})

// Handle process terminations
// (this ensures that there is any connection open with DB when I stop the app)
process
  .on('SIGINT', db.disconnect)
  .on('SIGTERM', db.disconnect)

// finally I only expose the methods to being used by my app script
module.exports = db
