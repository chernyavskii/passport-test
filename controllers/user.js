'use strict'
var express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = (userService, config) => {
    const router = express.Router();
    function ensureAuthenticated(req, res, next) {
        if(req.isAuthenticated())
        {
            return next();
        }
        res.redirect('/');
    }

    router.get('/:firstName',ensureAuthenticated,(req, res) => {
        userService.getProfile(req.params.firstName)
            .then((post) => res.send(post)
            .catch((err) => res.error(err)))
    });

    router.post('/create', multipartMiddleware,ensureAuthenticated, (req, res) =>{
        userService.newProfile(req.body.firstName,req.body.lastName,req.files.image.path)
            .then((post) => res.send(post))
            .catch((err) => res.error(err));
    });

    return router;
}