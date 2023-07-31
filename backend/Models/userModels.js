const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mob:{
        type:Number,
    },
    password:{
        type:String,
    },
    is_admin:{
        type:Boolean,
        default:false
    }
})

const user=mongoose.model('User',userSchema)
module.exports=user