const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength: [12, "Password must contain 12 letter"]
    }
})

const createUser = mongoose.model("user", userSchema)
module.exports = createUser;