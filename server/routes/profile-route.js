const express = require("express");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const router = express.Router();
const profileLogic = require("../services/profile-logic");

router.get("/:userId", async (request, response, next) => {
  try {
    const responseData = await profileLogic.getProfile(
      request.params.userId,
      request.headers.authorization
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.put("/image", async (request, response, next) => {
  try {
    const responseData = await profileLogic.editImage(
      request.headers.authorization,
      request.body.imageUrl
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.put("/status", async (request, response, next) => {
  try {
    const responseData = await profileLogic.editStatus(
      request.headers.authorization,
      request.body.status
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

router.put("/lives", async (request, response, next) => {
  try {
    const responseData = await profileLogic.editLives(
      request.headers.authorization,
      request.body.lives
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});
router.put("/birthday", async (request, response, next) => {
  try {
    const responseData = await profileLogic.editBirthday(
      request.headers.authorization,
      request.body.birthday
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});
router.put("/relationship", async (request, response, next) => {
  try {
    const responseData = await profileLogic.editRelationship(
      request.headers.authorization,
      request.body.relationship
    );
    response.send(responseData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
