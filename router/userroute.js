const express = require('express');
const router = express.Router();

const {updatePassword} = require('../controller/updatePassowrd.js')
const {signUp , logIn,logOut} = require('../controller/signup.js');
const {createAdmin,adminLogin , viewUsers} = require('../controller/admin.js')

const {loginLimit} = require('../middlewares/rateLimiter.js')


router.post('/signup',loginLimit,signUp);   // using same login limiter for signup because of same limit as login
router.post('/login',loginLimit,logIn);    // login limiter 
router.post('/logout',logOut);
router.put('/updatePass',updatePassword);
router.post('/admin',createAdmin);
router.post('/admin/login',adminLogin);
router.get('/admin/viewusers',viewUsers);


module.exports = router;