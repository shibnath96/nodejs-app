var email = require('./nodemailer');

email.send( 'shibnath.code@gmail.com', 'Testing', 'Hi Test', 'my signature' ).then( res => {
    console.log(res)
}).catch( err => {
    console.log( err );
})