var mysql = require('../models/mysql');

module.exports = function(req, res) {
    
    var connection = mysql.getConnection();
    
    connection.query('SELECT * FROM `testing_table`', function (err, rows, fields) {
        if (err) throw err
        console.log('The solution is: ', rowsrs)
    })
      
    connection.end();
    res.send({
        status: "Okay",
        success: true
    })
}