const mongoose = require('mongoose');

async function connectDB() {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
}

module.exports = connectDB;