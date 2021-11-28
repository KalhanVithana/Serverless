const responseHandler = {
  sendSucess: function (event, msg, content = {}, result = true) {
    let sucessResponse = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, no-cache",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy": "default-src 'none'",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        result,
        msg,
        content,
      }),
    };
    console.log("sucess", sucessResponse);
    return sucessResponse;
  },

  sendError: function (event, statusCode, msg, payload) {
    let errorResponse = {
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, no-cache",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy": "default-src 'none'",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        msg,
        payload,
      }),
    };

    return errorResponse;
  },
};

module.exports = responseHandler;
