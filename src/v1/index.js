'use strict'

const router = require('express').Router()
const tasks = require('./tasks')

router.use('/tasks', tasks)

module.exports = router
