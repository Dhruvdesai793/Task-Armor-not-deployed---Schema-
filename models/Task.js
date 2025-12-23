const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {type:String, required: true, trim: true},
    description: String, 
    status: {type: String , enum: ['pending','completed'], default: 'pending'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    createdAt: { type: Date, default: Date.now}
});


//Indexing owner so searching tasks for a specific user is lightning fast

taskSchema.index({owner:1,status:1});

module.exports = mongoose.model('Task', taskSchema);
