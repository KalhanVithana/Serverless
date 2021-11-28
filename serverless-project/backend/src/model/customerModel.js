const { v4 } = require("uuid");
const AWS = require("aws-sdk");


const  customerModel ={

    createCustomer: async (data) => {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const registerDate = new Date().toISOString();
        const id = v4();
        const newUser = {
          id,
          fname:data.fname,
          lname:data.lname,
          email: data.email,
          mobile:data.mobile,
          adminid:data.adminid
        };
        const params = {
          TableName: "customerTables",
          Item: newUser,
        };
        await dynamodb.put(params).promise();
       
    },
    fetchUsers: async (data) => {
        const dynamodb  = new AWS.DynamoDB.DocumentClient()
        // const result = await dynamodb.scan({ TableName: "userTables"}).promise();
        // return  users = result.Items


        const Exsting = {
          TableName: "customerTables",
          FilterExpression: "adminid = :e",
          ExpressionAttributeValues: { ":e": data.adminid },
        };
  const result=await dynamodb.scan(Exsting).promise();
          console.log("userss are",result.Items)
        return  result.Items;
      },
    deleteCustomers: async (id) => {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        console.log("user:",id)
        const result = await dynamodb.delete({TableName:"customerTables",Key:{id:id},ReturnValues:'ALL_OLD'}).promise() 
        //DeleteUserData = result.Attributes
        console.log("data:",result)
    
      },
    updateCustomers: async (data) => {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        console.log("user:",data.id)
        let UpdatedUser;
        const result = await dynamodb
        .update({
          TableName: "customerTables",
          Key: { id:data.id },
          UpdateExpression: "set fname = :fname ,lname = :lname,email = :email,mobile = :mobile",
          //ConditionExpression: 'attribute_exists(id)',
          ExpressionAttributeValues: {
            
            ":fname": data.fname,
            ":lname": data.lname,
            ":email": data.email,
            ":mobile": data.mobile,
      
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
  
        return UpdatedUser = result.Attributes
    
      },        
}

module.exports ={
    customerModel
}