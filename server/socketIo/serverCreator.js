const socket = require("socket.io");
const socketUsers = require("./socketUsers");
// const socketIoAuthorization = require("./socketIoAuthorization");
const messagesLogic = require("../services/messages-logic");

function socketServerCreator(serverHttp) {
  //all server settings
  const io = socket(serverHttp); // Need the http

  io.on("connect", (socket) => {
    console.log("userConnect");
    socketUsers.set(socket.request._query.userId, socket.id);

    socket.on("message_from_client", async (data) => {
      const serverResponse = await messagesLogic.sendMessage(
        data.text,
        socket.request._query.userId,
        data.conversationId
      );

      const dataResponse = {
        messageId: serverResponse.messageId,
        senderId: socket.request._query.userId,
        text: data.text,
        conversationId: data.conversationId,
      };
      serverResponse.usersId.map((userId) => {
        if (userId) {
          io.to(userId).emit("message_from_server", dataResponse);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
      socketUsers.delete(socket.request._query.userId);
    });
  });

  // return io;
}
module.exports = socketServerCreator;
