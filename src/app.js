import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

// Baaki aap ke saare imports iske neeche aayenge...
import express from 'express';
import cors from 'cors';
// ...
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const resumeRouter = require("./Routes/resumeRouter");
const AiRouter = require("./Routes/AiRoutes");

// CORS automatic configuration (Yeh akele hi kafi hai)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization'],
    credentials: true
}));

app.use(express.json());

connectDB();

app.get("/", function(req, res){
  res.json("Welcome bro!");
});

app.use("/api/resume", resumeRouter);
app.use("/api/gemini", AiRouter);

// Global Error Handler
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