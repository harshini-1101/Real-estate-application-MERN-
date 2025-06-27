const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected successfully");
}).catch((e)=>{
    console.log(e);
});

const app = express();

app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});