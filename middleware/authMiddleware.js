const jwt = require('jsonwebtoken');
const User= require('../models/User');

exports.protect = async (req, res, next) =>{
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({message :'Login required'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
        
    }catch(e) { res.status(401).json({message:'Invalid session'})};
};