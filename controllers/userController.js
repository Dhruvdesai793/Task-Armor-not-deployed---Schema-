const User = require('../models/User');
const cloudinary = require('cloudinary');

exports.updatePassword = async (req,res) =>{
    const user = await User.findById(req.user.id).select('+password');
    if(!(await user.correctPassword(req.body.currentPassword, user.password))) {
        return res.status(401).send('Wrong password');
    }
    user.password = req.body.newPassword;
    await user.save();
    res.send('Password updated');
};

exports.uploadAvatar = async (req,res) => {
    // Pipe buffer to Cloudinary
    cloudinary.uploader.upload_stream({folder:'avatars'}, async( err, result)=>{
        if(err) return res.status(500).send(err);
        await User.findByIdAndUpdate(req.user.id,{avatar:result.secure_url});
        res.json({url:result.secure_url});
    }).end(req.file.buffer);
};