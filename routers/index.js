var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("It's working...");
})
//Creating basic '/test' route
router.get('/test', function( req, res ) {
    res.render( 'test/test', {data: 'Testing data'} );
})

/** 
 *Following APIs will going to response as JSON data which actually use ./apis directory to executes backend realted tasks.
*/


/**
 *Following APIs will going to render view template as response
*/
router.get('/login', function(req, res) {
    res.render('admin/login/login', { src : 'home' });
})

module.exports = router;