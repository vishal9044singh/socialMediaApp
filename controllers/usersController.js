module.exports.profile = function(req,res){
    console.log('Step3: UsersController.js has loaded!')
    // return res.end('<h1>You have rendered Users Controller!!</h1>');
    return res.render('profile',{
        title:"My Profile Page",
        content:"Hey You have landed on profile Page!"
    });
}