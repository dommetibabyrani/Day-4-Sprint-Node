const mongoose = require("mongoose");

const userSchemaRules = {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate:function(){
            return this.password == this.confirmPassword 
        }
    },
    createaAt:{
        type:Date,
        default:Date.now()

    },
}

const userSchema = new mongoose.Schema(userSchemaRules);
// this modal -> will have Queries/Syntaxes
const UserModel = mongoose.model("UserModel",userSchema);

module.exports=UserModel