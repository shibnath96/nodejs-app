$(function() {

    var referrer = document.referrer; //Location of page source from where it came from
    var redirectTo;

    if( referrer!== "" ){
        $("#login-link").attr( 'href', referrer );
        redirectTo = referrer;
    }else {
        $("#login-link").attr( 'href', '/login' );
        redirectTo = '/login';
    }

    /**
        * fname lname email mob gen
        * Form validation for Signup form
    */
    var signupForm = $("#signup-form");
    signupForm.validate({
        rules : {
            fname: {
                required: true
            },
            lname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            mob: {
                required: true
            },
            gen: {
                required: true
            }
        },
        messages : {
            fname: {
                required: "First name is required"
            },
            lname: {
                required: "Last name is required"
            },
            email: {
                required: "Email is required",
                email: "Please provide a valid email address"
            },
            mob: {
                required: "Mobile is required"
            },
            gen: {
                required: "Gender is required"
            }
        },
        errorElement: 'em',
        errorPlacement: function( err, el ) {
            el.siblings('.error-placement').append(err)
        }
    })

    signupForm.on( 'submit', function(e) {
        e.preventDefault();
        if( signupForm.valid() ) {
            var signupData = {
                fname: $("input[name = 'fname']").val(),
                lname: $("input[name = 'lname']").val(),
                email: $("input[name = 'email']").val(),
                mob: $("input[name = 'mob']").val(),
                gen: $("input[name = 'gen']").val()
            }
            signupData.redirectTo = redirectTo;
            console.log(signupData);
            $.ajax({
                url: '/api/user/signup-form-submit',
                type: 'POST',
                data : signupData,
                dataType: '',
                success: function( res ) {
                    //document.body = res.responseText;
                    console.log(res);
                    
                }
            })

        }
    })

})