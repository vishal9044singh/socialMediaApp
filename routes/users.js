const express = require('express');
const router = express.Router();
const passport = require('passport');
const users_Controller = require('../controllers/usersController');

console.log('We are in routes users.js 3');
//this will be used when localhost:8000/users/profile is hitted and /users is carried forward from users.js
router.get('/profile', passport.checkAuthentication ,users_Controller.profile);
router.get('/signUp', users_Controller.signUp);
router.get('/signIn',users_Controller.signIn);
router.post('/create',users_Controller.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'},
)  ,users_Controller.createSession)

router.get('/signOut',users_Controller.destroySession);



module.exports = router;



