const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);

// Global err handler

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({message: err.message});
});

modules.exports = app;
