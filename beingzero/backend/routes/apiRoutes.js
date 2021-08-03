var express = require('express')
var router = express.Router()
var userModel = require('../models/userModel')
var logger = require('../lib/logLib').getLogger()

router.use(function timeLog (req, res, next) {
    logger.info('user Route Time: ', Date.now())
    next();
})


module.exports = router;