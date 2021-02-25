const Message = require("../models/message");
const encryption = require("../helper/encryption");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesUrls = require("../helper/filesUrls");

async function addMessage() {
  const message = new Message({
    userId: "5fec8162bfad850c44e646bc",
    text: "Hello third message",
    date: 1233,
  });
  message.save();
  return "good";
}
module.exports = {
  addMessage,
};
