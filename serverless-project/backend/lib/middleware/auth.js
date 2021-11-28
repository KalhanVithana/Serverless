const { DynamoDB } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const responsehelper = require("../helper/responseHelper");
const MYAUTH = async(event)=>{
    try{
        let user;
        console.log("event call ======",event)
        const token =
        (await event.headers) &&
        (event.headers["Authorization"] || event.headers["Authorization"]);
     if(token === null){
      return responsehelper.sendError(event, 401, " token inavalid");
     }
     console.log("event token ======",token)
     const verify = await jwt.verify(token, "process.env.JWT_Token");
     console.log("event verify ======",verify)
     if(!verify){
      return responsehelper.sendError(event, 401, "invalid token");
     }
     console.log(verify)
     event.user = verify.id 
    }
    catch(err){
      console.log("my err",err)
        throw new Error("401");
    }
 }
 
 module.exports = MYAUTH;