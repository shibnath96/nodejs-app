require('dotenv');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
})

module.exports = {
    initConnect: function() {
        return new Promise( function( resolve, reject ) {
            connection.connect( function(err) {
                if(err){
                    console.log('DB Connection error');
                    reject(err);
                }else {
                    resolve();
                }
            })
        })
    },
    getConnection: function() {
        return connection;
    }
}