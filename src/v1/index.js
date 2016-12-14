const router = require('express').Router()

router.route('/')
  .get((req, res, next) => {
    return res.json({
      message: 'Let\'s TODO!'
    })
  })

module.exports = router
