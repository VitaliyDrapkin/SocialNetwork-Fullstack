import { connect } from "react-redux";
import {
  actionsTypes,
  endLoadChatAC,
  setChatDataAC,
  startLoadChatAC,
} from "../../../../../redux/actionTypes";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "react";
import ChatPage from "./ChatPage";
import { Message } from "../../../../../models/message";
import { MessagesRequests } from "../../../../../API/MessagesRequests";
import { socketRequests } from "../../../../../socketIo/main";

interface mapStateToPropsType {
  ownId: string;
  previousId: string;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  loaded: boolean;
}

interface mapDispatchToPropsType {
  loadChat(userId: string, previousId: string): Promise<void>;
  sendMessage(text: string, conversationId: string): Promise<void>;
}
let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    ownId: state.authData.id,
    previousId: state.chatData.companionId,
    conversationId: state.chatData.conversationId,
    firstName: state.chatData.firstName,
    lastName: state.chatData.lastName,
    profileImg: state.chatData.profileImg,
    messages: state.chatData.messages,
    loaded: state.chatData.isChatLoaded,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    loadChat: async (userId: string, previousId: string) => {
      if (userId === previousId) {
        return;
      }
      const conversation = await MessagesRequests.getConversation(userId);
      dispatch(startLoadChatAC());
      console.log(conversation.messages);
      dispatch(
        setChatDataAC(
          conversation._id,
          conversation.companion.firstName,
          conversation.companion.lastName,
          conversation.companion.profileImg,
          conversation.messages,
          conversation.companion._id
        )
      );
      dispatch(endLoadChatAC());
    },

    sendMessage: async (text: string, conversationId: string) => {
      if (!text) {
        return;
      }
      socketRequests.sendMessage(text, conversationId);
    },
  };
};

const ChatPageContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);

export default ChatPageContainer;
