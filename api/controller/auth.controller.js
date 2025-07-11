const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken');

const signup = async(req,res,next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("user created successfully");
    }
    catch(err){
        next(err);
    }
}

const signin = async(req,res,next)=>{
    const {email, password} = req.body;
    try {
        validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'invalid password'));
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

module.exports = {signup, signin};