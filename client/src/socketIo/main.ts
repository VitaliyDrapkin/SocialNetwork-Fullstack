import { addMessageAC } from "./../redux/actionTypes";
import { toast } from "react-toastify";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import { store } from "../redux/store";

const cookies = new Cookies();

//Client establish a connection to the server:

let socket: SocketIOClient.Socket;
export const addSocketEvents = () => {
  socket = io("http://localhost:3001/", {
    // query: "token=" + cookies.get("token"),
    query: "userId=" + store.getState().authData.id,
  });

  type messageFromServerType = {
    messageId: string;
    text: string;
    conversationId: string;
    senderId: string;
  };
  socket.on("message_from_server", (data: messageFromServerType) => {
    store.dispatch(
      addMessageAC(
        data.conversationId,
        data.text,
        data.messageId,
        data.senderId === store.getState().authData.id
      )
    );
  });

  socket.on("connect_error", async () => {
    alert("Lost connection to the server. Trying to reconnect");
  });

  // socket.on("reconnect", async () => {
  //   toast.success("Server reconnected");
  // });
};

export const socketRequests = {
  sendMessage: (text: string, conversationId: string) => {
    socket.emit("message_from_client", { text, conversationId });
  },

  endSocket() {
    socket.disconnect();
  },
};
