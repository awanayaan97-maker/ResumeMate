require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const resumeRouter = require("./Routes/resumeRouter");
const AiRouter = require("./Routes/AiRoutes");

// app.use(cors());

// Purane app.use(cors()) ki jagah yeh lagao:
app.use(cors({
    origin: '*', // Har origin ko allow karo
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization'],
    credentials: true
}));

// Pre-flight requests (OPTIONS) ko Express level par handle karne ke liye:
app.options('*', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");
    res.sendStatus(200);
});

app.use(express.json());
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