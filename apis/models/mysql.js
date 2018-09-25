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
        connection.connect();
        console.log('MySQL database connected successfully!!');
    },
    getConnection: function() {
        return connection;
    }
}