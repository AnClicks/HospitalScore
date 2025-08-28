const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    userId:ObjectId,
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    middleName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    }

})

const Admin = new Schema({
    adminId:ObjectId,
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    middleName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    hospitalList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"                                  ////export this table
        }
    ]
})

const Hospitals = new Schema ({
    hostpitalId:ObjectId,
    hospitalName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        unique:true,
        required:true
    },
    phonenumber:{
        type:String,
        unique:true,
        required:true
    },
    rating:{
        type:String
    },
    specialization:[
        {
            doctorExpertise:{
                type:String,
            }
        }
    ],
    userReviews:[
                                        /// Will use this object and convert into CSV file and input as model
        {
            // username:{
            //     type:String,
            //     required:true,
            //     trim:true
            // },
            // userReview:String,
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'                  /// export this table

        }
    ]

})

const Reviews = new Schema ({
    reviewId:ObjectId,
    userId:{
        type:String,
        required:true,
    },
    reveiw:
        {
            answer:[],
            required:true
        },
    detailReview:{
        type:String,
    }

})

//make hospital model and export all model