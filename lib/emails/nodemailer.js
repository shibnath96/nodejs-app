require('dotenv').config('../../.env');
var nodemailer = require('nodemailer');

module.exports = {
    senderEmail: 'nodejsapp.mailer@gmail.com', //process.env.ADMIN_EMAIL,
    senderEmailPass: 'nodemailer@123', //process.env.ADMIN_EMAIL_PASSWORD,
    config: function() {
        var senderEmail = this.senderEmail;
        var senderEmailPass = this.senderEmailPass;
        
        var transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smpt.gmail.com',
            port: 587,
            auth: {
                user: senderEmail,
                pass: senderEmailPass
            }
        });
        return transport;
    },
    send: function( mailTo, subject, body ) {
        return new Promise( (resolve, reject) => {
            
            var mailOption = {
                from: '"NodeJsApp Admin" <'+ this.senderEmail +'>', // sender address
                to: mailTo, // list of receivers
                subject: subject, // Subject line
                html: body // html body
            };
            
            var transport = this.config();
            transport.sendMail( mailOption, function( err, info) {
                
                if( err ){
                    reject({
                        success: false,
                        err: err
                    })
                } else {
                    resolve({
                        success: true,
                        info: info
                    })
                }
            });
        })
    }
}