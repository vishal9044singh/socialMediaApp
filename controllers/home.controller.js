module.exports.home = function(req,res){
    return res.end('<h1>You have accessed home.controller with function named home, when the req is comming in routes through browser we have redirected to controller for desired result.</h1>')
}