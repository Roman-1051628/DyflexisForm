const express = require('express');

//controller functions
const {
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    makeNewUser
} = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all routes
router.use(requireAuth);

//Route: get all users
router.get('/getusers', getAllUsers);

//Route: get user by id
router.get('/getuser/:id', getUserById);

//Route: make a new user
router.post('/newuser', makeNewUser);

//Route: update user by id
router.put('/updateuser/:id', updateUserById);

//Route: delete user by id
router.delete('/deleteuser/:id', deleteUserById);

module.exports = router;