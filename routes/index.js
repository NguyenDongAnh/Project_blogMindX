var firebase = require('firebase')
var express = require('express');
var router = express.Router();
var fs = require('fs');
var loginControllers = require('../controllers/loginControllers.js');
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', layout: false });
});
router.post('/login', async function(req, res, next) {
    result = await loginControllers.loginAuth(req, res, next);
    if (result) {
        const user = firebase.auth().currentUser
        sessionUser = req.session;
        sessionUser.uID = user.uid;
        sessionUser.email = user.email;
        console.log(sessionUser);
        res.redirect('/');
    } else res.redirect('/login');
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register', layout: false });
})
router.post('/register', function(req, res, next) {
    loginControllers.registerAuth(req, res, next);
})
router.get('/logout', function(req, res, next) {
    req.session.email = null;
    req.session.uID = null;
    res.redirect('/login')
})
router.get('/', function(req, res, next) {
    currentUser = req.session.uID;
    var c;
    if (currentUser != null) {
        c = true;
    } else {
        c = false;
    }
    urlAccount = '/blog/account'
    res.render('home', {
        title: 'Home',
        layout: false,
        check: currentUser,
        urlAccount: urlAccount,
    });
});
module.exports = router;