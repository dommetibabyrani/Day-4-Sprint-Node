const mongoose = require("mongoose");

const productSchemaRules = {
    name:{
        type:String,
        required:[true,"Kindly pass the name"],
        unique:[true,"Product name should be unique"],
        maxlength:[10,"your Product name length is more than 10 characters"]
    },
    price:{
        type:String,
        required:[true,"Kindly pass the price"],
        validate:{
            validator:function(){
                return this.price > 0;
            },
            message:"Price can't be negative"
        },
    },
    categories:{
        type:String,
        required:true
    },
    productImages:{
        type:[String]
    },
    averageRating:Number,
    discountedPrice:{
        type:String,
        validate:{
            validator:function(){
                return this.discountedPrice < this.price;
            },
            message:"Discount must be lessthan actual price"
        },
    }
    
}
const productSchema = new mongoose.Schema(productSchemaRules);
// this modal -> will have Queries/Syntaxes
const ProductModel = mongoose.model("ProductModel",productSchema);

module.exports=ProductModel