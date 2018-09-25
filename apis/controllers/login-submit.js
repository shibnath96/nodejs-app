module.exports = function(req, res) {
    
    res.send({
        status: 'Ok',
        success: true,
        data: req.body
    })
}