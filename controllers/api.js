const express = require('express');

module.exports = (userService, config, passport) => {
    var router = express.Router();

    var controller = require('./index')(userService, config, passport);
    var userController = require('./user')(userService, config,passport);

    router.use("/",controller);
    router.use('/users', userController);

    return router;
};


