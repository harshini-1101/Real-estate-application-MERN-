const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require("./routes/user.route");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected successfully");
}).catch((e)=>{
    console.log(e);
});

const app = express();

app.use("/api/user",userRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});