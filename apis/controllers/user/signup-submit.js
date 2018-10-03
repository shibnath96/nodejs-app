module.exports = function(req, res) {
    var data = req.body;
    if(
        data.fname === undefined ||
        data.lname === undefined ||
        data.email === undefined ||
        data.mob === undefined ||
        data.gen === undefined 
    ){
        res.render('admin/login/login', { error : data })
    }else {
        
        var qry = `
            INSERT INTO 'users'(   
                id, fname, lname, email, mobile, verified, status	
                sessions, loggedin_devices, 
                acc_create_date, last_login, 
                last_login_devices, profile_pic_url
            ) VALUES(
                "", ${data.fname}, ${data.lname}, ${data.email}, ${data.mob}, ${data.gen}, ${data.email},
            );
        `;
    }

}