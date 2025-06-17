const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected successfully");
}).catch((e)=>{
    console.log(e);
});

const app = express();

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});