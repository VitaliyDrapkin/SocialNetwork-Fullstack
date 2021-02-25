const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user");
const encryption = require("../helper/encryption");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const filesUrls = require("../helper/filesUrls");
const socketUsers = require("../socketIo/socketUsers");

async function getMessengers(bearerToken) {
  try {
    // const userId = encryption.bearerTokenToUserId(bearerToken);
    const userId = "5fe24fa51f663d4468f03123";
    let response = await Conversation.find({
      $and: [{ usersId: userId }, { lastMessage: { $exists: true } }],
    })
      .select(["lastMessage", "usersId"])
      .populate("usersId", ["firstName", "lastName", "profileImage"])
      .sort({ lastMessageDate: -1 });

    const dataResponse = response.map((item) => {
      const companionInArray = item.usersId
        .filter((usersIdResponse) => {
          return usersIdResponse._id != "5fe24fa51f663d4468f03123";
        })
        .map((usersIdResponse) => {
          usersIdResponse.profileImage = filesUrls.getCorrectUrl(
            usersIdResponse.profileImage
          );
          return usersIdResponse;
        });
      const companion = companionInArray[0];
      return {
        companion,
        lastMessage: item.lastMessage,
      };
    });
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
}

async function getConversation(userId, bearerToken) {
  try {
    const ownId = encryption.bearerTokenToUserId(bearerToken);
    let response = await Conversation.findOne({
      $and: [{ usersId: userId }, { usersId: ownId }],
    })
      .select("messages")
      .populate("messages", ["userId", "text"]);

    if (!response) {
      const conversation = new Conversation({
        usersId: [userId, ownId],
      });
      response = await conversation.save();
    }

    const companion = await User.findById(userId).select([
      "firstName",
      "lastName",
      "profileImage",
    ]);
    companion.profileImage = filesUrls.getCorrectUrl(companion.profileImage);

    return { _id: response._id, messages: response.messages, companion };
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage(text, ownId, conversationId) {
  try {
    const message = new Message({
      text: text,
      userId: ownId,
      date: new Date().getTime(),
    });
    const messageResponse = await message.save();
    const conversationResponse = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $push: { messages: { $each: [messageResponse._id], $position: 0 } },
        lastMessage: text,
        lastMessageDate: new Date().getTime(),
      }
    );
    const usersId = conversationResponse.usersId.map((id) => {
      return socketUsers.get(id.toString());
    });
    const messageId = conversationResponse._id.toString();
    return { usersId, messageId };
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getConversation,
  sendMessage,
  getMessengers,
};
