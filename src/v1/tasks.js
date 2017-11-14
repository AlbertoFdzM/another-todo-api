'use strict'

const router = require('express').Router()
const Task = require('../models/task')

router.route('/')

  .get((req, res, next) => {
    Task.find((err, tasks) => {
      if (err) return next(err)

      return res.json(tasks)
    })
  })

  .post((req, res, next) => {
    Task.create(req.body, (err, task) => {
      if (err) return next(err)

      return res.status(201).json(task)
    })
  })

  .delete((req, res, next) => {
    Task.remove((err) => {
      if (err) return next(err)

      return res.status(204).end()
    })

    res.status(204).end()
  })

router.param('taskId', (req, res, next, id) => {
  Task.findById(id, (err, task) => {
    if (err) return next(err)

    if (!task) {
      err = new Error('Task not found')
      err.status = 404
    } else {
      req.task = task
    }

    return next(err)
  })
})

router.route('/:taskId')

  .get((req, res, next) => {
    return res.json(req.task)
  })

  .put((req, res, next) => {
    Task.findByIdAndUpdate(req.task.id, {
      $set: req.body
    }, {
      new: true,
      overwrite: true,
      runValidators: true
    }, (err, task) => {
      if (err) return next(err)

      return res.json(task)
    })
  })

  .patch((req, res, next) => {
    Task.findByIdAndUpdate(req.task.id, {
      $set: req.body
    }, {
      new: true,
      runValidators: true
    }, (err, task) => {
      if (err) return next(err)

      return res.json(task)
    })
  })

  .delete((req, res, next) => {
    Task.findByIdAndRemove(req.task.id, (err) => {
      if (err) return next(err)

      res.status(204).end()
    })
  })

module.exports = router
