const express = require('express');
const router = express.Router();

const {updatePassword} = require('../controller/updatePassowrd.js')
const {signUp , logIn} = require('../controller/signup.js');


router.post('/signup',signUp);
router.post('/login',logIn);
router.put('/updatePass',updatePassword);


module.exports = router