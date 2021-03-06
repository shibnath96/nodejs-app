var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors');
var router = require('./routers/index');
var app = express();
var methodOverride = require('method-override')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//To making all APIs cors origin
app.use(cors());

//Setting up view template engin..
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//Setting up app's view assets location
app.use('/app-assets', express.static(__dirname + '/assets/'));
app.use('/admin-assets', express.static(__dirname + '/views/admin/assets'));

//MySQL Database connection
var mysql = require('./apis/models/mysql');
mysql.initConnect().then( function(res) {
    console.log('MySQL DB connected!');
    //Router configuration
    app.use(router);

    //Setting up a default page not found(404 error) page
    app.get('*', function(req, res) {
        res.render('404-page.html')
    })
    
}).catch( function(err) {
    console.log('Something went error');
    //Setting up a default page not found(404 error) page
    app.get('*', function(req, res) {
        res.render('404-page.html')
    })
})


app.listen( process.env.PORT, function() {
    console.log( 'Express server is running on http://localhost:'+process.env.PORT );
})