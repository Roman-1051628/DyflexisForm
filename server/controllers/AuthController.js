const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create token

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '1d' });
};

//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token, role: user.role, id: user._id, name: user.name});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

//signup user

const signupUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const newUser = await userModel.signup(name, password, email);

        const token = createToken(newUser._id);

        res.status(200).json({email, token, role: newUser.role, id: newUser._id, name: newUser.name});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// export all controllers
module.exports = { 
    loginUser, 
    signupUser
};
