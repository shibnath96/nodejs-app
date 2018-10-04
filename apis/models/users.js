var mysql = require('./mysql');
var dbCon = mysql.getConnection();

'use strict'

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
    insertRow: function( columns, table ) {
        var qry = `
            INSERT INTO ${ table } VALUES(  )
        `
    },
    addNewUser: function( qry ) {
        return new Promise( function(resolve, reject) {
            dbCon.query( qry, ( err, data ) => {
                if( err ) {
                    reject({
                        error: true,
                        details: err,
                        dataInsert: true
                    })
                } else {
                    resolve({
                        error: false,
                        dataInsert: true,
                        data: data
                    })
                }
            })
        })
    },
    updateUser: function( qry ) {

    }
}