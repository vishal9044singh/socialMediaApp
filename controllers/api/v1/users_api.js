const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

//signIn and create a user session
module.exports.createSession = async function (req, res) {
    console.log('in users.api in createSession',req.body);
    console.log('in users.api in createSession',req.user);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid Username/password !'
            })
        }
        return res.json(200, {
            message: 'Sign in successfully and here is your token!',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
            }
        })
    } catch (err) {
        console.log('Got Error in creating session!',err);
       return res.json(500, {
        message:'Internal server Error!'
       })
    }
}