const express = require("express");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const router = express.Router();
const usersLogic = require("../services/users-logic");

router.post("/registration", async (request, response, next) => {
  try {
    const responseData = await usersLogic.addUser(request.body);
    response
      .cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send(responseData.userResponse);
  } catch (error) {
    return next(error);
  }
});

router.post("/auth", async (request, response, next) => {
  try {
    const responseData = await usersLogic.login(request.body);
    response
      .cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send(responseData.userResponse);
  } catch (error) {
    return next(error);
  }
});

router.delete("/auth", async (request, response, next) => {
  try {
    await usersLogic.logout(request.cookies.refreshToken);
    response.clearCookie("refreshToken").send("logout");
  } catch (error) {
    return next(error);
  }
});

router.get("/refresh", async (request, response, next) => {
  try {
    const responseData = await usersLogic.refreshTokens(
      request.cookies.refreshToken
    );
    response
      .cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send({ accessToken: responseData.userResponse });
  } catch (error) {
    return next(error);
  }
});

router.get("/autoLogin", async (request, response, next) => {
  try {
    if (!request.cookies.refreshToken) {
      throw new ServerError(ErrorType.REFRESH_TOKEN_ERROR);
    }
    const responseData = await usersLogic.autoLogin(
      request.cookies.refreshToken
    );
    response
      .cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send(responseData.userResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
