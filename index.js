var express = require('express');
require('dotenv').config();
var router = require('./routers/index');
var app = express();
//Setting view template engin..
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//Setting up some JS library for templating like jQuery, jQuery-UI, BootStrap etc
app.use('/js', express.static(__dirname + '/assets/common/js'));
app.use('/css', express.static(__dirname + '/assets/common/css'));

//Router configuration
app.use(router);

app.listen( process.env.PORT, function() {
    console.log( 'Express server is running on http://localhost:'+process.env.PORT );
})