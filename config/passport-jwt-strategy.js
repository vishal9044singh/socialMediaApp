const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done){
    try{
      let user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
    }catch(err){
        console.log('got error in finding user!',err);
        return;
    }
    // User.findById(jwtPayload._id , function(err, user) {
    //     if (err) {
    //         console.log('got error in finding user!')
    //         return;
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

module.exports = passport;