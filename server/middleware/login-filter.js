const expressJwt = require("express-jwt");
const config = require("../helper/config.json");

// Extracting the text from the secret's JSON
const secret = config.secretAccessToken;

function authenticateJwtRequestToken() {
  try {
    return expressJwt({
      secret,
      algorithms: ["HS256"],
    }).unless({
      path: [
        // public routes that don't require authentication
        "/users/auth",
        "/users/refresh",
        "/users/autoLogin",
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = authenticateJwtRequestToken;
