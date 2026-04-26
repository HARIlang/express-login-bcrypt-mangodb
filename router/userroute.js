const express = require('express');
const router = express.Router();

const {updatePassword} = require('../controller/updatePassowrd.js')
const {signUp , logIn} = require('../controller/signup.js');
const createAdmin = require('../controller/admin.js')


router.post('/signup',signUp);
router.post('/login',logIn);
router.put('/updatePass',updatePassword);
router.post('/admin',createAdmin);


module.exports = router