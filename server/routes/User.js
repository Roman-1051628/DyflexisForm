const express = require('express');

//controller functions
const {
    loginUser,
    signupUser
} = require('../controllers/AuthController');

const router = express.Router();

//Route: login
router.post('/login', loginUser);

//Route: signup
router.post('/signup', signupUser);



module.exports = router;