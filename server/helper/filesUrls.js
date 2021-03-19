const keys = require("../keys");
const FILES_FOLDER = "upload/";

const getCorrectUrl = (imgUrl) => {
  if (!imgUrl) {
    return "";
  }
  const fullImageUrl = keys.BASE_URL + FILES_FOLDER + imgUrl;
  return fullImageUrl;
};

module.exports = {
  getCorrectUrl,
};
