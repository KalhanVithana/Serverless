const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const crypto = require('crypto');
const responsehelper = require("../../lib/helper/responseHelper");

const UserModel = {
  createUser: async (data) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const registerDate = new Date().toISOString();
    const id = v4();
    let randomstring = await Math.random().toString(36).slice(-8);
    const newUser = {
      id,
      fname:data.fname,
      lname:data.lname,
      email: data.email,
      password: data.password,
      verifyed: false,
      registerDate,
      verifycode:randomstring
    };
    const params = {
      TableName: "userTables",
      Item: newUser,
    };
    await dynamodb.put(params).promise();
    console.log(data.email)
    const msg = {
      to: `${data.email}`,
      from: '#', 
      subject: 'Sending with Twilio SendGrid is Fun',
      text: `verication `,
      html: `<strong>verication code  ${randomstring}</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
          console
          .log("sucess",msg)
      }, error => {
        console.error(error);
      });
  },

  verifyedUser: async (data) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("user data :", data);

    const results = await dynamodb
      .update({
        TableName: "userTables",
        Key: { id: data },
        UpdateExpression: "set verifyed = :verifyed",
        //ConditionExpression: 'attribute_exists(id)',
        ExpressionAttributeValues: {
          ":verifyed": true,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    const updateUser = results.Attributes;
  },
  deleteUser: async (id) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("user:",id)
    const result = await dynamodb.delete({TableName:"userTables",Key:{id:id},ReturnValues:'ALL_OLD'}).promise() 
    //DeleteUserData = result.Attributes
    console.log("data:",result)

  },
  forgotUser: async (data) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("data:",data)
    const forgottoken = crypto.randomBytes(20).toString('hex');
    let expireToken =Date.now() + 360000;
    console.log("token",forgottoken)
    console.log("expireToken",expireToken)

    const results = await dynamodb
    .update({
      TableName: "userTables",
      Key: { id: data },
      UpdateExpression: "set forgottoken = :t,expireToken = :expireToken",
      //ConditionExpression: 'attribute_exists(id)',
      ExpressionAttributeValues: {
        ":t": forgottoken,
        ":expireToken":expireToken
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
    const updateUser = results.Attributes;

  },
  resetUser: async (data) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    console.log("user: id ",data.uid)
    const results = await dynamodb
    .update({
      TableName: "userTables",
      Key: { id: data.uid },
      UpdateExpression: "set password = :p",
      //ConditionExpression: 'attribute_exists(id)',
      ExpressionAttributeValues: {
        ":p": data.password,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
    const updateUser = results.Attributes;
    console.log("result",results)

  },
  fetchUser: async () => {
    const dynamodb  = new AWS.DynamoDB.DocumentClient()
    const result = await dynamodb.scan({ TableName: "userTables"}).promise();
    console.log("items",result)
    return users = result.Items
  
    
  },
  fetchUserId: async () => {
    
    const dynamodb  = new AWS.DynamoDB.DocumentClient()
    const result = await dynamodb
      .get({ TableName: "userTables", Key:{id}})
      .promise();
    return users = result.Item;
   
  },
  validateUser: async (data) => {
    
    const dynamodb  = new AWS.DynamoDB.DocumentClient()
  
    console.log("uid",data.id)

    let users;
    const result = await dynamodb
      .get({ TableName: "userTables", Key: { id: data.id }})
      .promise();
      console.log("my result",result)
    
    if(result.Item.verifyed === false){
      return false;
    }



     
     return  users = result.Item;

    
  },
};

module.exports = {
  UserModel,
};
