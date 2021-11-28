const { DynamoDB } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const MYAUTH = async(event)=>{
    try{
        let user;
        console.log("event call",event)
        const token =await  event.headers && (event.headers["x-auth"] || event.headers["X-auth"]);
 

     if(!token){
          throw new Error("401");
     }
     let verify = jwt.verify(token, "process.env.JWT_Token");
     if(!verify){
        throw new Error("401");
     }
     console.log(verify)
     
       event.user = verify.id
      
 
    }
    catch(err){
        throw new Error("500");
    }
 }
 
 module.exports = MYAUTH;