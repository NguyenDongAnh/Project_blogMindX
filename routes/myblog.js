var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogControllers.js')
var auth = require('../middleware/auth.js')
router.get('/account', auth, function(req, res, next) {
    currentUser = req.session.uID;
    router.get('/account/' + currentUser, function(req, res, next) {
        urlAccount = '/blog/account'
        res.render('article', {
            title: 'Article',
            layout: false,
            urlAccount: urlAccount
        })
    })
    return res.redirect('/blog/account/' + currentUser)
})
module.exports = router;