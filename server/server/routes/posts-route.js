const express = require("express");
const router = express.Router();
const postsLogic = require("../services/posts-logic");

router.get("/", async (request, response, next) => {
  try {
    const postsData = await postsLogic.getAll(
      request.headers.authorization,
      "",
      true
    );
    response.send(postsData);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const postId = await postsLogic.addPost(
      request.body,
      request.headers.authorization
    );
    response.send(postId);
  } catch (error) {
    return next(error);
  }
});

router.put("/:postId", async (request, response, next) => {
  try {
    const postId = await postsLogic.editPost(
      request.params.postId,
      request.body.text,
      request.body.fileURL,
      request.headers.authorization
    );
    response.send(postId);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    await postsLogic.deletePost(
      request.params.id,
      request.headers.authorization
    );
    response.send("Post deleted successfully");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
