$(function(){
    var locationUrl = window.location;
    var reqSrc  = $("#reqSrc");

    if(locationUrl.search !== "") {
        reqSrc.html(locationUrl.search.split("=")[1])
    }else {
        reqSrc.html('Home');
    }
    reqSrc.show();

    var loginForm = $("#login-form");
    loginForm.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            pass: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "Email is required",
                email: "Please provide a valid email address"
            },
            pass: {
                required: "Password is required"
            },
            
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );
            element.parents( ".error-container" ).addClass( "has-feedback" );

            error.insertAfter( element );

            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".error-container" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".error-container" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        }
    });
    
    loginForm.submit( function(e) {
        e.preventDefault();
        if( loginForm.valid() ){
            var loginData = {
                email: e.target[0].value,
                pass: e.target[1].value,
                socialLogin: false
            }

            $.ajax({
                url: '/api/user/login-form-submit',
                method: "POST",
                data: loginData,
                dataType: "json",
                beforeSend: function( request ) {
                    request.setRequestHeader("Authority", 'authorizationToken key');
                },
                success: function( response ) {
                    console.log(response);
                },
                error: function( error ) {
                    alert('Something went wrong with backend API');
                    console.log(error);
                }
            })
        }
    })
    
})