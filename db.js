const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Users = new Schema({
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
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    middlename:{
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
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    middlename:{
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
            ref:"Hospitals"                                  ////export this table
        }
    ]
})

const Hospitals = new Schema ({
    hostpitalId:ObjectId,
    adminId:{
        type:String,
        required:true
    },
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
    review:
        {
            answer:[],
            required:true
        },
    detailReview:{
        type:String,
    }

})

//make hospital model and export all model
const HospitalRating= new Schema({
    hospitalRatingId:ObjectId,
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospitals"
    },
    rating:Number
})
 const UserModel = mongoose.model('user',Users);
 const AdminModel = mongoose.model('admin',Admin);
 const HospitalModel = mongoose.model('hospital',Hospitals);
 const ReviewModel = mongoose.model('review',Reviews);
 const HospitalRatingModel = mongoose.model('hospitalrating',HospitalRating);
 
 module.exports={
    UserModel,
    AdminModel,
    HospitalModel,
    ReviewModel,
    HospitalRatingModel,
 }