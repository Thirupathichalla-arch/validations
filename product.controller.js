const express = require("express");

//const path = require("path")

const Product = require("../models/product.model");


const {body, validationResult } = require("express-validator");

const router = express.Router();

router.post("/",
 body("first_name").notEmpty().isLength({min:4,max:10}).withMessage("First_name is req"),
 body("last_name").notEmpty().isLength({min:4,max:10}).withMessage("Last_name is req"),
 body("email").custom(async (value)=>{
     console.log(body("pincode"))
    const isEmail=/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,20}$/.test(value);
    const  listOfdomain=["gmail.com","yahoo.com"];

    const email=value.split("@");
    if(!listOfdomain.includes(email[1])){
        throw new Error("we do not accept emails from this domain");
    }
    if(!isEmail){
        throw new Error("Please enter a proper email address");
    }
    const productbyEmail= await Product.findOne({email:value}).lean().exec();
    if(productbyEmail){
        throw new Error("Please try with a different email address");
    }

}),
body("pincode").isLength(6).withMessage("pincode should be in 6 digits"),
body("age").isLength({min:1,max:100}).withMessage("age should be in 1-100"),
body("gender").custom(async (value)=>{
    const  gtype=["male","female","others"];
    
    if(!gtype.includes(value)){
        throw new Error("we do not accept gender");
    }
}),
/*body("pincode").custom((value)=>{
    const isNumber=/^[0-9]*$/.test(value);
    if(!isNumber || value<=0){
        throw new Error("Price con't bo 0 or negitive");
    }
    return true;
}),*/
  async (req, res) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        let newErrors=errors.array().map(({msg,param,location})=>{
            return {
                [param]:msg,
            }
        });
        return res.status(400).json({errors:newErrors})
    }
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});


module.exports=router;
