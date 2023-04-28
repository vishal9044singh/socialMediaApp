const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
console.log('Step1: Index.js Router Loaded!');


//router.get will be used when '/' query comes in.
router.get('/',homeController.home);

//router.use will redirect to users.js route for futher access.
router.use('/users',require('./users'));

//router.use will redirect to postsController.js for further access.
router.use('/posts',require('./posts'));

module.exports = router;