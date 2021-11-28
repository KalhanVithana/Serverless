const { customerModel } = require("../model/customerModel");
const AWS = require("aws-sdk");
const responsehelper = require("../../lib/helper/responseHelper");

const customerHandler = {
  registerCustomer: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { fname, lname, email, mobile } = JSON.parse(event.body);
    try {
      let A = event.user;
      let uid = A[0];
      console.log(uid);
      const data = {
        fname,
        lname,
        email,
        mobile,
        adminid: uid,
      };
      const Exsting = {
        TableName: "customerTables",
        FilterExpression: "email = :e",
        ExpressionAttributeValues: { ":e": data.email },
      };
      const result = await dynamodb.scan(Exsting).promise();
      console.log("items", result.Items);
      if (result.Items.length > 0) {
        return responsehelper.sendError(event, 400, "Customer already exsist.");
      }
      await customerModel.createCustomer(data);

      return responsehelper.sendSucess(event, "sucess added");
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(
        event,
        500,
        "something wrong register user",
        { email, password }
      );
    }
  },
  fetchCustomers: async (event) => {
    try {
      let A = event.user;
      let uid = A[0];
      console.log(uid);
      const data = {
        adminid: uid,
      };

      console.log("user id", data.adminid);

      const result = await customerModel.fetchUsers(data);
      console.log("is=========", result);
      return responsehelper.sendSucess(event, " Fetch success ", result);
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  deleteCustomer: async (event) => {
    try {
      const { id } = event.pathParameters;
      await customerModel.deleteCustomers(id);
      return responsehelper.sendSucess(event, "user deleted successfully ");
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "user not auth", e);
    }
  },
  updateCustomer: async (event) => {
    const { id, fname, lname, email, mobile } = JSON.parse(event.body);
    try {
      let A = event.user;
      let uid = A[0];
      console.log(uid);
      const data = {
        id,
        fname,
        lname,
        email,
        mobile,
      };

      console.log("data.id", data.id);
      const updated = await customerModel.updateCustomers(data);
      return responsehelper.sendSucess(
        event,
        "user updated successfully ",
        updated
      );
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "user not auth", e);
    }
  },
};

module.exports = {
  customerHandler,
};
