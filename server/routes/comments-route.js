const express = require("express");
const router = express.Router();
const postsLogic = require("../services/posts-logic");

router.post("/", async (request, response, next) => {
  try {
    commentId = await postsLogic.addComment(
      request.body,
      request.headers.authorization
    );
    response.send(commentId);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:postId/:commentId", async (request, response, next) => {
  try {
    await postsLogic.deleteComment(
      request.params.postId,
      request.params.commentId,
      request.headers.authorization
    );
    response.send("Comment deleted successfully");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
