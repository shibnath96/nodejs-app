var express = require('express');
var router = express.Router();
var crypto = require('crypto');
require('dotenv').config();

router.get('/', function(req, res) {
    res.send("It's working...");
})
//Creating basic '/test' route
router.get('/test', function( req, res ) {
    //res.render( 'test/test', {data: 'Testing data'} );
    var key = process.env.ACCOUNT_VERIFICATION_KEY;
    res.send({
        status: 'Ok'
    })
})

/* List of middlewares*/
var loginSubmit = require('../apis/controllers/user/login-submit');
var signupSubmit = require('../apis/controllers/user/signup-submit');
var socialLoginManager = require('../apis/controllers/user/social-login');

/** 
 *Following APIs will going to response as JSON data which actually use ./apis directory to executes backend realted tasks.
*/
router.post('/api/user/login-form-submit', loginSubmit);
router.post('/api/user/signup-form-submit', signupSubmit);
router.post('/api/user/social-login-manager', socialLoginManager);


/**
 *Following APIs will going to render view template as response
*/
router.get('/login', function(req, res) {
    res.render('admin/login/login', { error : null });
})
router.get('/signup', function(req, res) {
    res.render('admin/signup/signup', { });
})
router.get('/verify', function(req, res) {
    res.render('admin/verify/verify', { });
})

module.exports = router;