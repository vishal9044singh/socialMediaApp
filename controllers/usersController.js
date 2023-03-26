const User = require('../models/users');
const Post = require('../models/posts');

module.exports.profile = async function (req, res) {
    console.log('Step3: UsersController.js has loaded!',req.params);
    try {
        let user = await User.findById(req.params.id);
        return res.render('profile', {
            title: "My Profile Page",
            content: "Hey You have landed on profile Page!",
            profile_user: user
        });
    }catch (err) {
       console.log("got Error in loading profile of user!",err);
       return res.redirect('back');
    }
}

//rendering signUp page
module.exports.signUp = function (req, res) {
    console.log('We are in usersController in signUp');
    if (!!req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('users_signUp', {
        title: "SignUp Page",
        content: "Hey! You are in signUp Page"
    });
}

//rendering signIn page
module.exports.signIn = function (req, res) {
    console.log('We are in usersController in signIn req is');
    if (!!req.isAuthenticated()) {
        return res.redirect('/');
    }
    // if(req.isAuthenticated())
    return res.render('users_signIn', {
        title: "SignIn Page",
        content: "Hey! You are on signIn Page"
    });
}

//get signUp data and create account
module.exports.create = async function (req, res) {
    console.log('We are in usersController in create!!!');
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        let createdUser = await User.create(req.body);
        res.locals.user = createdUser;
        if (!createdUser) {
            console.log('got error in creating user while signing Up!');
            return;
        }
        console.log('You are successfully signed up!');
        return res.redirect('/users/signIn');
    }
    else {
        console.log('Email Already Used! Please Use different Email!');
        return res.redirect('back');
    }
}

//signIn and create a user session
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully!');
    
    return res.redirect('/');
}

//doing signOut that is destroying session
module.exports.destroySession = function (req, res, next) {
    console.log('in usersController in destroySession');
    //Todo later
    req.logout(function (err) {
        if (err) {
            console.log('got error in logging out the user!')
            return res.redirect('back');
        }
        req.flash('success','Logged Out Successfully!')
        return res.redirect('/');
    });
}

module.exports.update = async function(req,res){
    console.log('in usersController in update',req.body, req.params, req.user);
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.user.id, req.body);
            console.log('Profile successfully Updated!');
            return res.redirect('back');
          }else{
             return res.status(401).send("Unautherized");
          }
    }catch(err){
        console.log('Got Error in Updating User',err);
        return res.redirect('back');
    }
}