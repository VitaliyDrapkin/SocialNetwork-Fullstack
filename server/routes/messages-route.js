const express = require("express");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const router = express.Router();
const messagesLogic = require("../services/messages-logic");

router.get("/", async (request, response, next) => {
  try {
    const responseData = await messagesLogic.getMessengers(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/:userId", async (request, response, next) => {
  try {
    const responseData = await messagesLogic.getConversation(
      request.params.userId,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
