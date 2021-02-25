const express = require("express");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const router = express.Router();
const friendsLogic = require("../services/friends-logic");

router.get("/data", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.getFriendsData(
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});
router.get("/data/:id", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.getFriendsData(
      request.headers.authorization,
      request.params.id
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/search", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.getSearchFriends(
      request.query.filter,
      request.query.start,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.post("/request/:id", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.sendRequest(
      request.params.id,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.delete("/request/:id", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.cancelRequest(
      request.params.id,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.get("/request/:id", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.confirmRequest(
      request.params.id,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const responseData = await friendsLogic.removeFriend(
      request.params.id,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
