require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const resumeRouter = require("./Routes/resumeRouter");
const AiRouter = require("./Routes/AiRoutes");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", function(req, res){
  res.json("Welcome bro!");
});

app.use("/api/resume", resumeRouter);
app.use("/api/gemini", AiRouter);

// Global Error Handler (Spelling Fixed)
app.use(function(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server is down";

    res.status(statusCode).json({ success: false, message: message });
});

if(process.env.PRODUCTION === 'false'){
    app.listen(process.env.PORT || 4000, function(){
        console.log("Server is working fine");
    });
}

module.exports = app;