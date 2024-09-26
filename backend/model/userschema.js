import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    district:{
        type:String
    },
    taluk:{
        type:String
    },
    isadmin:{
        type:Boolean,
        default:true
    }
},{timeseries:true})

const User=mongoose.model('User',userschema)

export default User

