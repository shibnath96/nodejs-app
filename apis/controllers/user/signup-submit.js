require('dotenv').config();
var model = require('../../models/users');
var response = require('../../../lib/responses/users/signup');
var email = require('../../../lib/emails/nodemailer');

module.exports = function(req, res) {
    var reqData = req.body;
    if(
        reqData.fname === undefined ||
        reqData.lname === undefined ||
        reqData.email === undefined ||
        reqData.mob === undefined ||
        reqData.gen === undefined 
    ){
        //resObj, statusCode, erroType, msg, data
        response.fail( res, 200, 'validation', 'Request body contained invalid data', {})
    }else {
        
        var qry = `
            INSERT INTO USERS (   
                id, fname, lname, email, mobile, verified, status,	
                sessions, loggedin_devices, 
                acc_create_date, last_login, 
                last_login_devices, profile_pic_url
            ) VALUES(
                "", '${reqData.fname}', '${reqData.lname}', '${reqData.email}', '${reqData.mob}', '${false}', '${'active'}', '${null}', '${null}',
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
        //resObj, statusCode, erroType, msg, data
        model.fetchDbRow( col, 'USERS' ).then( dbData => {
            
            var t = 0;
            var rows = dbData.data;
            
            if ( !dbData.error ){
                for (let i = 0; i < rows.length; i++) {
                    if( rows[i].email === reqData.email ) {
                        t++;
                        response.fail( res, 200, 'userExist', 'User already exist!. Email or mobile  already exist in database!.', {});
                        break;
                    }
                }

                if( t === 0) {
                    //User doesn't exist, Now we can insert the user data....
                    model.addNewUser( qry ).then( info => {
                        if( !info.error && info.dataInsert ) {
                            //When user inserted successfully

                            //Sending email to new user
                            var veryLink = `http://${ process.env.LOCAL_HOST }:${ process.env.PORT }/verify?account=${reqData.email}&session=abcdef&continue=${reqData.redirectTo}`;
                            var emailSubject = 'Welcome to NodeJsApp - Account created successfully!';
                            var emailBody = `
                                <div>
                                    <p>
                                        Hi <b> ${ reqData.fname },</b>
                                    </p>
                                    <p>
                                        Thank you for get registered with us. Your email(${reqData.email}) and other information have been saved to our record. To know details visit our 
                                        <a href="https://nodejs.org" target="_blank">website</a>.
                                    </p>
                                    <p>
                                        To get first time signin to your app, you need verify your accout first. We'd recomend you to click the link below to verofy your accout. <br>
                                        <a href="${ veryLink }" target="_blank">Verify Now</a>
                                    </p>
                                    <p>
                                        <b>Note: </b> Unless you verify your account, you won't be able to access your account.
                                    </p>
                                    <p>
                                        Regards,
                                        <p>
                                            <b>NodeJsApp developer team</b>
                                        </p>    
                                    </p>
                                </div>
                            `;
                            
                            email.send( reqData.email, emailSubject, emailBody).then( emailStatus => {
                                if( emailStatus.success ) {
                                    response.success( res, 200, null, 'Email & Mobile number saved to database successfully!', {
                                        info: {
                                            name: `${ reqData.fname } ${ reqData.lname }`,
                                            email: reqData.email,
                                            mobile: reqData.mob,
                                            veryLink: true
                                        }
                                    });
                                } else {
                                    response.success( res, 200, null, 'Email & Mobile number saved to database successfully!', {
                                        info: {
                                            name: `${ reqData.fname } ${ reqData.lname }`,
                                            email: reqData.email,
                                            mobile: reqData.mob,
                                            veryLink: false
                                        }
                                    });
                                }
                            }).catch( emailErr => {
                                if( !emailErr.success ) {
                                    response.success( res, 200, null, 'Email & Mobile number saved to database successfully!', {
                                        info: {
                                            name: `${ reqData.fname } ${ reqData.lname }`,
                                            email: reqData.email,
                                            mobile: reqData.mob,
                                            veryLink: false
                                        }
                                    });
                                }
                            }) 

                        }else {
                            response.fail( res, 200, 'userExist', 'User already exist!. Email or mobile  already exist in database!.', {});
                        }
                    }).catch( err => {
                        response.fail( res, 200, 'userExist', 'User already exist!. Email or mobile  already exist in database!.', 
                            {
                                err: err
                            }
                        );
                    })
                    
                }

            }else {
                response.fail( res, 500, 'db', 'Getting error while inserting data to database', {});
            }

        }).catch( err => {
            response.fail( res, 500, 'db', 'Getting error while inserting data to database',
                {
                    err: err
                }
            );
        })

        
    }

}