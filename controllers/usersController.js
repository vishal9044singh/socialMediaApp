const User = require('../models/users');

module.exports.profile = function (req, res) {
    console.log('Step3: UsersController.js has loaded!')
    // return res.end('<h1>You have rendered Users Controller!!</h1>');
    return res.render('profile', {
        title: "My Profile Page",
        content: "Hey You have landed on profile Page!"
    });
}

//rendering signUp page
module.exports.signUp = function (req, res) {
    console.log('We are in usersController in signUp');
    return res.render('users_signUp', {
        title: "SignUp Page",
        content: "Hey! You are in signUp Page"
    });
}

//rendering signIn page
module.exports.signIn = function (req, res) {
    console.log('We are in usersController in signIn');
    return res.render('users_signIn', {
        title: "SignIn Page",
        content: "Hey! You are in signIn Page"
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
    //todo later
}