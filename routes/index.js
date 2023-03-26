const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
console.log('Step1: Index.js Router Loaded!');


//this router.get will redirect tp homeController.js for further access.
router.get('/',homeController.home);

//this router.use will redirect to users.js route for futher access.
router.use('/users',require('./users'));

//this router.use will redirect to comments.js route for further access.
router.use('/comments', require('./comments'));

//this router.use will redirect to postsController.js for further access.
router.use('/posts',require('./posts'));

module.exports = router;