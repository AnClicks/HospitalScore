const { Router }  = require("express");
const bcrypt = require("bcrypt")
const { AdminModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

const adminRouter = Router();

adminRouter.post("/signup",async (req,res)=>{
    const requiredBody = z.object({
        email:z.email(),
        password:z.string()
        .min(8,"Password must be 8 character long")
        .max(32,"Password must be less than 32 characters")
        .regex(/[A-Z]/,"Password must have a upper letter")
        .regex(/[a-z]/,"Password must have a small letter")
        .regex(/[^A-Za-z0-9]/,"Password must have a special character"),
        firstName:z.string()
        .max(32,"First name should be under 32 characters"),
        middlename:z.string()
        .max(32,"First name should be under 32 characters"),
        lastName:z.string()
        .max(32,"First name should be under 32 characters"),
        firstName:z.string()
   
    })
    const parsedDatawithSuccess = await requiredBody.safeParse(req.body);

    if(!parsedDatawithSuccess){
        res.status(400).json({
            error:"Incorrect format "+ parsedDatawithSuccess.error
        })
        return;
    }

    const {email,password,firstName,middlename,lastName} = req.body;
    const hashedpassword = await bcrypt.hash(password,5);

    try{
        await AdminModel.create({
            email:email,
            password:hashedpassword,
            firstname:firstName,
            middlename:middlename,
            lastName:lastName
        })
    }
    catch(err){
        res.status(402).json({
            message:"Some required files are missing or your accound already exists "+ err
        })
        return;
    }
    res.status(200).json({
        message:"Admin accound created"
    })
})

adminRouter.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await AdminModel.findOne({
        email:email
    })
    if(!user){
        res.status(404).json({
            message:"Incorrect Credentials"
        })
    }
    const passwordMatch = await bcrypt.compare(password,user.password);

    if(passwordMatch){
        const token = jwt.sign({
            id:user._id
        },JWT_ADMIN_SECRET);

        res.status(200).json({
            token:token,
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
module.exports ={
    adminRouter:adminRouter
}