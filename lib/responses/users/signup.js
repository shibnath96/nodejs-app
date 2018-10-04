module.exports = {

    success: function( resObj, statusCode, errorType, msg, data ) {
        resObj.status( statusCode ).send({
            meta: {
                signup: true,
                status: statusCode,
                error: false,
                errorType: errorType
            },
            data: {
                msg: msg,
                data: data
            }
        });
    },
    fail: function( resObj, statusCode, errorType, msg, data ) {
        resObj.status( statusCode ).send({
            meta: {
                signup: false,
                status: statusCode,
                error: true,
                errorType: errorType
            },
            data: {
                msg: msg,
                data: data
            }
        });
    }

}