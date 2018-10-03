var model = require('../../models/users');

module.exports = function(req, res) {
    var data = req.body;
    if(
        data.fname === undefined ||
        data.lname === undefined ||
        data.email === undefined ||
        data.mob === undefined ||
        data.gen === undefined 
    ){
        res.send('Invalid input!!');
    }else {
        
        var qry = `
            INSERT INTO USERS (   
                id, fname, lname, email, mobile, verified, status,	
                sessions, loggedin_devices, 
                acc_create_date, last_login, 
                last_login_devices, profile_pic_url
            ) VALUES(
                "", '${data.fname}', '${data.lname}', '${data.email}', '${data.mob}', '${true}', '${'active'}', '${null}', '${null}',
                '${new Date()}', '${null}', '${null}', '${null}' 
            );
        `;

        var col = [
            'id', 'fname', 'lname','email', 'mobile'
        ]
        
        /**
         *  @description: The following method will return promise which may reqturn how many column you have requested from mySQL DB
         *  Definition File Location: ../../model/users.js (Line: 3)
         * Arguments required: It's required two paramenter as a argument of this method.
         *                      Frist Parameter should be a array type if you wish do a projection operation otherwise it should be blanik string if you wish to fetch all columns i.e. selection operation
         *                      Second Parameter must be Table name (String type)
         */
        model.fetchDbRow( col, 'USERS' ).then( data => {
            var t = 0;
            data.forEach( row => {
                if( data.email === row.email && data.mob === row.mobile ) {
                    //User already exist
                    t++;
                }
            });

            if ( t != 0) {
                res.send({
                    meta: {
                        signup: false,
                        status: 200
                    },
                    data: {
                        msg: 'Email or Mobile number already exist!. Please try with another.'
                    }
                })
            }else if( t == 0){
                res.send('Data about to saved!')
            }

        }).catch( err => {
            res.send( err );
        })

        
    }

}