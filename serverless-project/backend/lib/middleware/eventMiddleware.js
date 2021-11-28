const responseHandler = require("../helper/responseHelper");

const eventMiddleware = async (event, ...middlewares) => {
  let result = null;

  try {
    for (const middleware of middlewares) {
      result = await middleware(event);
    }
    console.log("========================" + result);

    return result;
  } catch (err) {
    console.log("error" + err);

    if (err.message == "401") {
      return responseHandler.sendError(event, 401, "acesss denid ", err);
    } else if (err.message == "400") {
      return responseHandler.sendError(event, 400, "invalid parameter ", err);
    } else {
      return responseHandler.sendError(event, 500, " something wrong ", err);
    }
  }
};

module.exports = {
  eventMiddleware,
};
