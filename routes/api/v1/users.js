const express = require('express');
const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');

console.log('>>>>>>>>>>>>>users.js in v1');

router.post('/create-session',usersApi.createSession);


module.exports = router;