module.exports = {
    verifyNewAccount: ( firstName, email ,verifyLink) => {
        var template = `
            <div>
                <p>
                    Hi <b> ${ firstName },</b>
                </p>
                <p>
                    Thank you for get registered with us. Your email(${ email }) and other information have been saved to our record. To know details visit our 
                    <a href="https://nodejs.org" target="_blank">website</a>.
                </p>
                <p>
                    To get first time signin to your app, you need verify your accout first. We'd recomend you to click the link below to verofy your accout. <br>
                    <a href="${ verifyLink }" target="_blank">Verify Now</a>
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
        `
        return template;
    },
    verifyAccount: ( firstName, email ,verifyLink) => {
        var template = `
            <div>
                <p>
                    Hi <b> ${ firstName },</b>
                </p>
                <p>
                    We'd recomend you to click the link below to verify your accout.<br>
                    <a href="${ verifyLink }" target="_blank">Verify Now</a>
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
        `
        return template;
    }
}