'use strict'
var express = require('express');

module.exports = (indexService, config, passport) => {
    const router = express.Router();
    function ensureAuthenticated(req, res, next) {
        if(req.isAuthenticated())
        {
            return next();
        }
        res.redirect('/');
    }

    router.get('/',(req,res)=>{
        res.render('index',{user:req.user});
    });

    router.get('/auth/facebook',passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook',{successRedirect: '/account',failureRedirect: '/'}),
        function (req,res) {
            res.redirect('/account');
        });

    router.get('/account',ensureAuthenticated,function (req, res) {
        res.render('account',{user:req.user});
    })

    router.get('/logout',function (req, res) {
        req.logout();
        res.redirect('/');
    });


    return router;
}