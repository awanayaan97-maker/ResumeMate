const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
    
    try {
        await mongoose.connect(process.env.CONNECT_STRING);
        console.log("Db is connected");  
    } 
    catch (error) {
       console.log(error);
       
    }
}
module.exports = connectDB