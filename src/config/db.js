const mongoose = require("mongoose");

async function connectDB() {
    if (!process.env.CONNECT_STRING) {
        console.error("ERROR: process.env.CONNECT_STRING is undefined! Check your Vercel/Env settings.");
        return;
    }

    try {
        await mongoose.connect(process.env.CONNECT_STRING, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log("Db is connected successfully, jani!");  
    } 
    catch (error) {
    console.error("DB Connection Error: ", error.message);
    }
}

module.exports = connectDB;