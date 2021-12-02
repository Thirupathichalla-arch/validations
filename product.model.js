const {Schema,model}=require("mongoose");

const productSchema=new Schema({
    first_name:{required:true,type:String},
    last_name:{required:true,type:String},
    email:{require:true,type:String},
    pincode:{require:true,type:Number},
    age:{require:true,type:Number},
    gender:{require:true,type:String},
},{
    versionKey:false,
    timestamps:true,
});

module.exports=new model("products",productSchema)