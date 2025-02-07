const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const {PORT, DB_USER,DB_PASSWORD} = process.env
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");

const {getAllFactory,
    createFactory,
    getByIdFactory,
    deleteByIdFactory} = require("./utility/crudFactory");

const app = express();

app.use(express.json());//to get data from user

const dbURL=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ggn7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbURL).then(function(connection){
    console.log("DB Connected");

}).catch(err => console.log(err));


/*** Handler functions  or Controller functions ***/   

//Hoisting -> newer functions/variables in JS will be used in execution than previous one.
/** for ex: In Backend we should not write Regular fns because Hoisting will happend
 *  Suppose we have "function getAllUsers()" regular fn some other developer again he wrote 
 * "function getAllUsers()" regular fn then in execution old one is ignored new one will execute. 
 * so always write function expression.
 */


/************ Users ***************/

/* const getAllUsers = async function(req,res) {
    try{
        const userData = await UserModel.find();
        if(userData.length == 0){
            throw new Error ("No users found");
        }
        res.status(200).json({
            status:"success",
            message:userData
        })

    }catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }
    
} */

const createUserHandler =  createFactory(UserModel); 
const getAllUsers = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const deleteById = deleteByIdFactory(UserModel);

const checkInput = function(req,res,next){//To check,whether the user sending empty object or the object have any details or not to post method
    if(req.method =="POST"){
        const userDetails = req.body;
        const isEmpty=Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"User Details are Empty"
            })
        }
    }else{
        next();
    }
}

 
 
/****************************** Products ****************/

const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

/* const getAllProductHandler = async function(req,res) {
    try{
        const productData = await ProductModel.find();
        if(productData.length == 0){
            throw new Error ("No products found");
        }
        res.status(200).json({
            status:"success",
            message:productData
        })

    }catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }
    
} */






/*** API's (or) Routes ***/

/********* Users */
app.get("/api/user",getAllUsers);

app.post("/api/user",checkInput,createUserHandler);

app.get("/api/user/:userId",getUserById);

app.delete("/api/user/:userId",deleteById);


/********** products */
app.get("/api/product",getAllProductHandler);

app.post("/api/product",createProductHandler);

app.get("/api/product/:productId",getProductById);

app.delete("/api/product/:productId",deleteProductById);

/************* Closure in JS */



app.listen(PORT,function(req,res){
    console.log(`Server is running at ${PORT}`);
})