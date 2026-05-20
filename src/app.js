const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const resumeRouter = require("./Routes/resumeRouter");
const AiRouter = require("./Routes/AiRoutes");

app.use(cors());
app.use(express.json());

connectDB()

app.use("/api/resume", resumeRouter);
app.use("/api/gemini", AiRouter)



app.use(function(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const meassage = err.meassage || "Server is down";

    res.status(statusCode).json({success: false, meassage: meassage})
})

if(process.env.PRODUCTION === 'false'){
app.listen(process.env.PORT, function(){
    console.log("Server is working fine")
})
}

module.exports = app;