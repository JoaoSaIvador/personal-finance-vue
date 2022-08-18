const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const oldUser = await User.findOne({ email: req.email });

    if (oldUser) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    // Encrypt password
    var encryptedPassword = await bcrypt.hash(req.password, 10);

    // Create new user
    const user = new User({
        username: req.username,
        email: req.email.toLowerCase(),
        password: encryptedPassword
    });

    // Save user in MongoDB
    try {
        const savedUser = await newUser.save();
        res.json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    // Check if user exists with the same email and if given password is correct
    const user = await User.findOne({ email: req.email });

    if (!user) {
        return res.status(404).json({ message: 'User does not exist!' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    // Create JWT Token
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "2min"
        }
    );
    res.header('authorization', 'Bearer ' + token);

    res.json({ message: 'Logged in!' });
});

module.exports = router;