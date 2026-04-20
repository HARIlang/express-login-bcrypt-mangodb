const express = require('express');
const router = express.Router();

const {signUp} = require('../controller/signup.js');


router.post('/signup',signUp);


module.exports = router