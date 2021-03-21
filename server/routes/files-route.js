let filesLogic = require("../services/files-Logic");
const express = require("express");

const router = express.Router();

//upload photo
router.post("/upload", async (request, response) => {
  try {
    //response in photo logic multer
    await filesLogic.uploadFile(request, response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
