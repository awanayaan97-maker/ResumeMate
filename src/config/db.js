const mongoose = require("mongoose");

async function connectDB() {
    // 💡 Pehle check karo ke string mil bhi rahi hai ya nahi
    if (!process.env.CONNECT_STRING) {
        console.error("❌ ERROR: process.env.CONNECT_STRING is undefined! Check your Vercel/Env settings.");
        return;
    }

    try {
        // Safe check laga kar connect karo
        await mongoose.connect(process.env.CONNECT_STRING, {
            serverSelectionTimeoutMS: 5000 // 5 seconds mein timeout de agar connect na ho
        });
        console.log("🚀 Db is connected successfully, jani!");  
    } 
    catch (error) {
        console.error("❌ DB Connection Error: ", error.message);
    }
}

module.exports = connectDB;