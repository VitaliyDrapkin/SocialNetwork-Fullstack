const express = require("express");
const router = express.Router();
const postsLogic = require("../services/posts-logic");

router.post("/:postId", async (request, response, next) => {
  try {
    await postsLogic.addLike(
      request.params.postId,
      request.headers.authorization
    );
    response.send("Like added successfully");
  } catch (error) {
    return next(error);
  }
});

router.delete("/:postId", async (request, response, next) => {
  try {
    await postsLogic.removeLike(
      request.params.postId,
      request.headers.authorization
    );
    response.send("Like removed successfully");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
