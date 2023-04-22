const express = require('express');

const router = express.Router();
const users_Controller = require('../controllers/usersController');

//this will be used when localhost:8000/users/profile is hitted and /users is carried forward from users.js
router.get('/profile',users_Controller.profile);

module.exports = router;



