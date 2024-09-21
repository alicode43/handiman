import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post('/signIn',async(req,res)=>{
    const {email, password} = req.body;

    const user=await User.findOne({email:email})
    if(user){
        const validPassword=await bcrypt.compare(password,user.password);
        if(validPassword){
            res.status(200).json({message:"User signed in successfully"});

        }else{
            res.status(400).json({message:"Invalid password"});
        }
    }

});

export default authRouter
