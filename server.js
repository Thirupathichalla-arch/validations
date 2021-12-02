const  connect=require("./configs/db");

const app=require("./index");

app.listen(1565,async()=>{
    await connect();
    console.log("R u listening Thiru 1565");
})
module.exports=app;