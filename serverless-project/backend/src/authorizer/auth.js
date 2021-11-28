const { DynamoDB } = require("aws-sdk");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  console.log(event);
  const methodArn = event.methodArn;
  console.log("method is", methodArn);

  const token =await  event.headers && (event.headers["x-auth"] || event.headers["X-auth"]);

  if (!token) {
    console.log("no find token on the event");
  }
  console.log("token is ", token);
  try {
    let verify = await jwt.verify(token, "process.env.JWT_Token");

    console.log("verify============", verify);
    if (!verify) {
      return null;
    }

    return  await generateAuthResponse("user", "Allow", methodArn);
  } catch (e) {
    return  await generateAuthResponse("user", "Deny", methodArn);
  }
};

function generateAuthResponse(principalId, effect, methodArn) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument,
  };
}

function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };

  return policyDocument;
}
