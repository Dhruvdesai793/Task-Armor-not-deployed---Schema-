const mongoose = require('mongoose');


const connectToDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);

    }catch(e){
        console.error('mongodb failed');
        process.exit(1);
    }
}

module.exports = connectToDb;