/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import s from "./ChatPage.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import ChatItem from "../../../../components/App/Main/Content/ChatPage/ChatItem/ChatItem";
import EmojiPicker from "../../../../components/Helpers/EmojiPicker/EmojiPicker";
import { connect } from "react-redux";
import { Message } from "../../../../models/message";
import { RootState } from "../../../../redux/store";
import { Dispatch } from "react";
import { MessagesRequests } from "../../../../API/MessagesRequests";
import { socketRequests } from "../../../../socketIo/main";
import {
  actionsTypes,
  endLoadChatAC,
  setChatDataAC,
  startLoadChatAC,
} from "../../../../redux/actionTypes";

interface OwnProps {
  ownId: string;
  previousId: string;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  loaded: boolean;
  loadChat(userId: string, previousId: string): Promise<void>;
  sendMessage(text: string, conversationId: string): Promise<void>;
}

interface PropsFromState {
  ownId: string;
  previousId: string;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  loaded: boolean;
}
interface PropsFromDispatch {
  loadChat(userId: string, previousId: string): Promise<void>;
  sendMessage(text: string, conversationId: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function ChatPage(props: AllProps) {
  const [sendHover, setSendHover] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [value, setValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    props.loadChat(location.pathname.slice("/chat/".length), props.previousId);
  }, []); //Only in first load

  return props.loaded ? (
    <div className={s.chat}>
      <div className={s.chatTop}>
        <NavLink to="/messages" className={s.backBtnNav}>
          <div className={s.backBtn}>
            <div>
              <ArrowBackIosIcon />
            </div>

            <span>Back</span>
          </div>
        </NavLink>
        <div className={s.chatUserInfo}>
          <div className={s.userName}>
            {props.firstName} {props.lastName}
          </div>
          {/* <div className={s.onlineStatus}>online</div> */}
        </div>
        <div className={s.settingsAvatar}>
          <Avatar src={props.profileImg} />
        </div>
      </div>
      <div className={s.chatMain}>
        {props.messages.map((message) => (
          <ChatItem ownMessage={message.isSender} message={message.text} />
        ))}
      </div>
      <div className={s.chatBottom}>
        <div className={s.chatInput}>
          <input
            type="text"
            placeholder="enter message"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={(e) =>
              e.keyCode === 13 &&
              props.sendMessage(value, props.conversationId) &&
              setValue("")
            }
          />
        </div>
        <div className={s.chatSmile} onClick={() => setShowEmojiPicker(true)}>
          <InsertEmoticonIcon fontSize="large" style={{ color: "gold" }} />
          {showEmojiPicker && (
            <div className={s.emojiPicker}>
              <EmojiPicker
                closePicker={() => setShowEmojiPicker(false)}
                onAddEmoji={(emoji) => setValue(value + emoji)}
              />
            </div>
          )}
        </div>
        <div
          className={s.chatSend}
          onMouseOver={() => setSendHover(true)}
          onMouseOut={() => setSendHover(false)}
          onClick={() => {
            props.sendMessage(value, props.conversationId);
            setValue("");
          }}
        >
          {sendHover ? (
            <SendRoundedIcon fontSize="large" style={{ color: "#4A76CB" }} />
          ) : (
            <SendRoundedIcon fontSize="large" style={{ color: "grey" }} />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

let mapStateToProps = (state: RootState): PropsFromState => {
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
): PropsFromDispatch => {
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
  PropsFromState,
  PropsFromDispatch,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);

export default ChatPageContainer;
