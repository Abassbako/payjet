const { ObjectId } = require('mongodb');
const userModel = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign({ _id }, jwtKey, { 
        expiresIn: '20d'
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let User = await userModel.findOne({ $or: [{ name }, { email }] });

        if (User) return res.status(400).json('A user with this username or email address already exist');

        if (!name || !email || !password) return res.status(400).json('All fields are required');

        if (!validator.isEmail(email)) return res.status(401).json('Invalid email address');

        if (!validator.isStrongPassword(password)) return res.status(401).json('Not a strong password');

       User = new userModel(req.body);

        const salt = await bcrypt.genSalt(10);
        User.password = await bcrypt.hash(User.password, salt);

        const saveUser = await User.save();

        const token = createToken(User._id);
        res.status(201).json({ _id: User._id, name, email, token });
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const User = await userModel.findOne({ email });

        if (!User) return res.status(401).json('Invalid email or password');

        const isValidPassword = await bcrypt.compare(password, User.password);

        if (!isValidPassword) return res.status(401).json('Invalid email or password');

        const token = createToken(User._id);
        res.status(200).json({ _id: User._id, name: User.name, email, token });
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findUser = async (req, res) => {
    if (ObjectId.isValid(req.params.UserId)) {
        try {
            const { UserId } = req.params;

            const User = await userModel.findById(UserId);
    
            if (User) return res.status(200).json(User);

            else return res.status(400).json({ error: "User not found" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    
    } else return res.status(401).json({ error: "Invalid id" });
};

const getUsers = async (req, res) => {
    try {
        const Users = await userModel.find();

        res.status(200).json(Users);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const updateUser = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
        try {
            const { _id } = req.params;
    
            const User = await userModel.findByIdAndUpdate(_id, 
                {
                    $set: req.body
                },
                { new: true 
            });
    
            if (User) return res.status(200).json({ successful: "Your account has been successfully updated" });
    
            else return res.status(400).json({ error: "An error just occured while updating product" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e)
        };
    } else return res.status(401).json({ error: 'Invalid id' });
};

const deleteUser = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
      try {
        const { _id } = req.params;

        const User = await userModel.findByIdAndDelete(_id);

        if (User) return res.status(200).json({ successful: "Account successfully deleted" });

        else return res.status(400).json({ error: "An error just occured while deleting account" });
      } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
      }
    } else return res.status(401).json({ error: "Invalid id" });
};

module.exports = { registerUser, loginUser, findUser, getUsers, updateUser, deleteUser };