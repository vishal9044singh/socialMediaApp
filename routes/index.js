const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home.controller');
console.log('Step1: Index.js Router Loaded!');

//router.get will be used when '/' query comes in.
router.get('/',homeController.home);

console.log('We are in routes index.js 2');
//router.use will redirect to users.js route for futher access.
router.use('/users',require('./users'));

module.exports = router;