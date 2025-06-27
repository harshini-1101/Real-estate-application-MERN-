const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

const signup = async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("user created successfully");
    }
    catch(err){
        res.status(500).json(err.message);
    }
    
}

module.exports = signup;