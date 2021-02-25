const DOMAIN = "http://localhost:3001/";
const FILES_FOLDER = "upload/";

const getCorrectUrl = (imgUrl) => {
  if (!imgUrl) {
    return "";
  }
  const fullImageUrl = DOMAIN + FILES_FOLDER + imgUrl;
  return fullImageUrl;
};

module.exports = {
  getCorrectUrl,
};
