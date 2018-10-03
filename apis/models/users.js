var mysql = require('./mysql');
var dbCon = mysql.getConnection();

module.exports = {

    fetchDbRow: function( projection, table ) {

        return new Promise( ( resolve, reject) => {
            var col = ( typeof projection === "string" ) ? '*': projection.join(',');

            var qry = `
                SELECT ${ col } FROM ${ table }
            `
            dbCon.query( qry, function( err, rows ) {
                if( err) {
                    reject({
                        error: true,
                        details: err
                    })
                } else {
                    resolve({
                        error: false,
                        data: rows
                    })
                }
                    
            })
        });

    },
    addNewUser: function() {

    }

}