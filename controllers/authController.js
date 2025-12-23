const User = require("../models/User");
const jwt = require('jsonwebtoken');

const signToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});

};

exports.signup = async (req, res, next) =>{
    try {
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role: req.body.role
        });

        const token = signToken(newUser._id);
        res.status(201).json({status: 'success',token, data: {user: newUser}});

    }catch(e) {next(err);}
};


