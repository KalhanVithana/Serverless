const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { UserModel } = require("../model/userModel");
const responsehelper = require("../../lib/helper/responseHelper");
var jwt = require("jsonwebtoken");
const SES = new AWS.SES();

// const bcrypt = require('bcrypt');
require("dotenv").config();

const userHandler = {
  userRegister: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { fname, lname, email, password } = JSON.parse(event.body);

    // const salt = await bcrypt.genSalt();

    // const passwordhash = await bcrypt.hash(password, salt);
    // console.log(passwordhash)
    try {
      const data = {
        fname,
        lname,
        email,
        password,
      };
      const Exsting = {
        TableName: "userTables",
        FilterExpression: "email = :e",
        ExpressionAttributeValues: { ":e": data.email },
      };
      const result = await dynamodb.scan(Exsting).promise();
      console.log("items", result.Items);
      if (result.Items.length > 0) {
        return responsehelper.sendError(event, 400, "User already exsist.");
      }
      await UserModel.createUser(data);

      return responsehelper.sendSucess(event, "success", { email, password });
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

  userLogin: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { email, password } = JSON.parse(event.body);
    try {
      const data = {
        email,
        password,
      };
      const Exsting = {
        TableName: "userTables",
        FilterExpression: "email = :e",
        ExpressionAttributeValues: { ":e": data.email },
      };
      const result = await dynamodb.scan(Exsting).promise();
      if (result.Items.length == 0) {
        return responsehelper.sendError(event, 401, "User not exsist");
      }
      const id = result.Items.map((res) => res.id);
      const token = await jwt.sign({ id: id }, "process.env.JWT_Token");
      return responsehelper.sendSucess(event, "success", {
        token,
        user: {
          id: id,
        },
      });
    } catch (e) {
      return responsehelper.sendError(
        event,
        500,
        "something wrong login user",
        { email, password }
      );
    }
  },
  authLogin: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { email, password } = JSON.parse(event.body);
    try {
      const data = {
        email,
        password,
      };
      const Exsting = {
        TableName: "userTables",
        FilterExpression: "email = :e",
        ExpressionAttributeValues: { ":e": data.email },
      };
      const result = await dynamodb.scan(Exsting).promise();
      if (result.Items.length == 0) {
        return responsehelper.sendError(event, 400, "User not exsist");
      }
      const verifyPassword = result.Items.filter((res) => res.password === password);

      console.log("verify password is ",verifyPassword)
      if (verifyPassword.length == 0) {
        return responsehelper.sendError(event, 400, "invalid email or password");
      }
      
      
      const verifyed = result.Items.filter((res) => res.verifyed === true);
      if (verifyed.length == 0) {
        return responsehelper.sendError(event, 400, "user not verifyed");
      }
      const id = result.Items.map((res) => res.id);
      const token = await jwt.sign({ id: id }, "process.env.JWT_Token");
      return responsehelper.sendSucess(event, "success", {
        token,
        user: {
          id: id,
        },
      });
    } catch (e) {
      return responsehelper.sendError(
        event,
        500,
        "something wrong auth login user",
        { email, password }
      );
    }
  },
  verifyUser: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id, email, password, verifycode } = JSON.parse(event.body);
    try {
      console.log(event.user);
      const data = {
        id: event.user,
        email,
        password,
      };
      const params = {
        TableName: "userTables",
        Key: { id: event.user },
      };
      const result = await dynamodb.scan(params).promise();
      if (result.Items.length == 0) {
        return responsehelper.sendError(event, 401, "User not exsist");
      }
      const item = await result.Items.find(
        (res) => res.verifycode === verifycode
      );
      console.log("item iss", item);
      if (!item) {
        return responsehelper.sendError(
          event,
          401,
          "Invalid verfication code "
        );
      }
      let UpdatedUser;

      let A = event.user;
      let uid = A[0];
      console.log("fetch id:", uid);
      const results = await dynamodb
        .update({
          TableName: "userTables",
          Key: { id: uid },
          UpdateExpression: "set verifyed= :verifyed",
          //ConditionExpression: 'attribute_exists(id)',
          ExpressionAttributeValues: {
            ":verifyed": true,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      UpdatedUser = results.Attributes;
      //await UserModel.createUser(uid)
      return responsehelper.sendSucess(
        event,
        "succss verfication",
        UpdatedUser
      );
    } catch (e) {
      console.log("error:", e);
      return responsehelper.sendError(
        event,
        500,
        "something wrong verifcation",
        e
      );
    }
  },
  deleteData: async (event) => {
    try {
      const { id } = event.pathParameters;
      await UserModel.deleteUser(id);
      return responsehelper.sendSucess(event, "user deleted successfully ");
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "user not auth", e);
    }
  },
  forgotPassword: async (event) => {
    const { email } = JSON.parse(event.body);
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
      const Exsting = {
        TableName: "userTables",
        FilterExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email },
      };
      const result = await dynamodb.scan(Exsting).promise();
      console.log("user", result.Items);
      if (result.Items.length == 0) {
        return responsehelper.sendError(event, 400, "User not exsist ");
      }
      const findid = result.Items.map((res) => res.id);
      const getid = findid[0];
      console.log("fetch id:", getid);
      await UserModel.forgotUser(getid);
      return responsehelper.sendSucess(event, "success ".getid);
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  resetPassword: async (event) => {
    const { password, expireToken, forgottoken, email } = JSON.parse(
      event.body
    );
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
      let A = event.user;
      let uid = A[0];

      const data = {
        uid,
        password,
        expireToken,
        forgottoken,
        email,
      };

      const Exsting = {
        TableName: "userTables",
        FilterExpression: "forgottoken = :f",
        ExpressionAttributeValues: { ":f": data.forgottoken },
      };
      const result = await dynamodb.scan(Exsting).promise();
      console.log("user", result);

      if (result.Items.length === 0) {
        return responsehelper.sendError(event, 400, "invalid token ");
      }
      console.log("user:  ", result);

      await UserModel.resetUser(data);
      return responsehelper.sendSucess(event, " password reset success ");
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  fetchUsers: async (event) => {
    try {
      const result = await UserModel.fetchUser();
      return responsehelper.sendSucess(
        event,
        " password reset success ",
        result
      );
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  fetchId: async (event) => {
    try {
      const result = await UserModel.fetchUserId();
      return responsehelper.sendSucess(event, " users ", result);
    } catch (e) {
      console.log(e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  validateID: async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
      const token =
        (await event.headers) &&
        (event.headers["Authorization"] || event.headers["Authorization"]);
      if (!token) {
        return responsehelper.sendError(event, 401, "invalid token ");
      }
      let verify = jwt.verify(token, "process.env.JWT_Token");
      if (!verify) {
        return responsehelper.sendError(event, 401, "invalid token ");
      }
      let A = event.user;
      let uid = A[0];
      console.log("userid", uid);

      const result = await dynamodb
        .get({ TableName: "userTables", Key: { id: uid } })
        .promise();
      console.log("my result", result);

      if (result.Item.verifyed === false) {
        return responsehelper.sendError(event, 401, "invalid verfication ");
      }

      return responsehelper.sendSucess(event, " validate  success ", true);
    } catch (e) {
      console.log("err", e);
      return responsehelper.sendError(event, 500, "Something wrong", e);
    }
  },
  sendEmailApi: async (event) => {
    console.log("event", event);

    const { to, from, subject, text } = JSON.parse(event.body);

    if (!to || !from || !subject || !text) {
      return responsehelper.sendError(
        event,
        500,
        "to, from, subject and text are all required in the body"
      );
    }

    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: text },
        },
        Subject: { Data: subject },
      },
      Source: from,
    };

    try {
      await SES.sendEmail(params).promise();
      return responsehelper.sendSucess(event, " email send  success ");
    } catch (error) {
      console.log("error sending email ", error);
      return responsehelper.sendError(event, 400, "faild to send");
    }
  },
};
module.exports = userHandler;
