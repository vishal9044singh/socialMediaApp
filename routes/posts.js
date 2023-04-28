const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/postsController');

router.post('/createPost',passport.checkAuthentication, postsController.create);

module.exports = router;