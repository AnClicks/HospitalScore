const express = require("express");
const {Router} = require("express");
const { UserModel }= require("../db")
const { JWT_USER_SECRET } = require("../config")
const jwt = require("jsonwebtoken")
const {z} = require("zod")
const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/signup", async (req,res)=>{
    const requiredBody = z.object({
        email:z.email(),
        password:z.string()
        .min(8,"Passowrd must be 8 character long")
        .max(32,"Password must be less than 32 characters")
        .regex(/[A-Z]/,"Password must have a upper letter")
        .regex(/[a-z]/,"Password must have a small case letter")
        .regex(/[^A-Za-z0-9]/,"Password must have a special character"),
        firstName:z.string()
        .max(32,"First name should be under 32 characters"),
        middlename:z.string()
        .max(32,"First name should be under 32 characters"),
        lastName:z.string()
        .max(32,"First name should be under 32 characters"),
    })

    const parsedDatawithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDatawithSuccess){
        res.json({
            message:"Incorrect format",
            error:parsedDatawithSuccess.error
        })
        return;
    }

    const {email,password,firstName,middlename,lastName} =  req.body;
    const hashedpassword = await bcrypt.hash(password,5);

    try{
        //pushing to the database
       await UserModel.create({
            email:email,
            password:hashedpassword,
            firstname:firstName,
            middlename:middlename,
            lastName:lastName
        })
        

    }
    catch(err){
        res.status(402).json(
            {
                error:"Some required fields are missing or Your account already a"+err
            }
        )
        return;
    }
    res.status(200).json({
        message:"You are logged in"
    })
})

userRouter.post("/signin",async (req,res)=>{
    const email= req.body.email;
    const password=req.body.password;

    const user = await UserModel.findOne({
        email:email
    })
    if(!user){
        res.status(404).json({
            error:"You do not have an account or Incorrect Email"
        })
    }

    const passwordMatch = await bcrypt.compare(password,user.password);
   if(passwordMatch){
    const token = jwt.sign({
        id:user._id
    },JWT_USER_SECRET)
    res.status(200).json({
        token:token
    })
    return;
   }
   else{
    res.status(403).json({
        error:"Icorrect Password"
    })
    return;
   }
})

module.exports={
    userRouter:userRouter
}



