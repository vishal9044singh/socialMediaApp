const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        //find a user and establish the itentity.
        let user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            console.log('Invalid username/password-->passport!');
            return done(null, false);
        }
        return done(null, user);
    }
));

//serialize user function, taking out user_id and putting it into cookie.
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//de-serialize user function, using user_id and sending it to the server and doing authentication
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('got error in finding user-->passport', err);
        return done(err);
    }
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    console.log('in checkAuthentication req is', req.isAuthenticated);
    //if user is signed in pass the function to the next controller.
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/signIn');
}

passport.checkAuthenticationAtSignIN = function (req, res, next){
    console.log('in checkAuthenticationAtSignIn');
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/profile');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //here req.user contains the current signed in user, which we are assigning to res.locals for redirecting to the same profile page, unit session is not expired.
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;