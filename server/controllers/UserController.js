const userModel = require('../models/userModel');

// get all users for a certain id

const getAllUsers = async (req, res) => {
    const user_id = req.user._id;
    try {
        const users = await userModel.findById(user_id);
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// get user by id

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// make a new user
const makeNewUser = async (req, res) => {
    try {
        const user = await userModel.create(req.body);

        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// update user by id

const updateUserById = async (req, res) => {
    try {
    const id = req.params.id;
    const user = req.body;
    await userModel.findByIdAndUpdate(id, user);

    res.json({message: "User updated"});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// delete user by id

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);

        res.json({message: "User deleted"});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// export all controllers
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    makeNewUser
};