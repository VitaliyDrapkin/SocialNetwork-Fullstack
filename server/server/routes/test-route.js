const express = require("express");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const router = express.Router();
const testLogic = require("../services/test-logic");

router.post("/", async (request, response, next) => {
  try {
    const responseData = await testLogic.addMessage();
    response.send(responseData.userResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
