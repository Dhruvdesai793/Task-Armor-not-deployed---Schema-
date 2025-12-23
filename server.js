require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/db');

const app = express();
connectToDb();

const PORT = process.env.PORT || 3000;









app.listen(PORT, () =>{
    console.log('Server is running at :',PORT);
})
