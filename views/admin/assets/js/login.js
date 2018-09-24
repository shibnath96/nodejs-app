$(function(){
    var locationUrl = window.location;
    var reqSrc  = $("#reqSrc");

    if(locationUrl.search !== "") {
        reqSrc.html(locationUrl.search.split("=")[1])
    }else {
        reqSrc.html('Home');
    }
    reqSrc.show();

    $.validate({
        form: '#login-form',
    })

})