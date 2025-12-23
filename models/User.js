const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type : String, required: true, select: false},
    avatar: {type: String, default: 'default.jpg'},
    role: { type: String, enum: ['user','admin'], default: 'user'}
});

userSchema.pre('save', async (next) =>{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.correctPassword = async (cand , userPass) => {
    return await bcrypt.compare(cand , userPass);
}

module.exports = mongoose.model('User',userSchema);