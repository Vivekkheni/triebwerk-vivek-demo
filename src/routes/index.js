const userRoute = require('./user'),
    router = require('express').Router()

router.use('/user', userRoute)

module.exports = router