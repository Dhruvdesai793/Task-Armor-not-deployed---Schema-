require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ DB Connection Successful'))
    .catch(err => console.log('❌ DB Connection Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 TaskArmor Pro running on port ${PORT}`);
});