const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role // Optional: default is 'user'
        });

        const token = signToken(newUser._id);
        res.status(201).json({ status: 'success', token, data: { user: newUser } });
    } catch (err) { next(err); } // Send to Global Error Handler
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Provide email & password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token });
    } catch (err) { next(err); }
};