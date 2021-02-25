import React, { useEffect, useState } from "react";
import s from "./ChatPage.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import profilePicture from "../../../../../assets/images/profilePicture.jpg";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ChatItem from "./ChatItem/ChatItem";
import { useLocation } from "react-router";
import { Message } from "../../../../../Model/message";
import { socketRequests } from "../../../../../socketIo/main";

interface ChatPageProps {
  ownId: string;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  loadChat(userId: string): Promise<void>;
  sendMessage(text: string, conversationId: string): Promise<void>;
}
function ChatPage(props: ChatPageProps) {
  const [sendHover, setSendHover] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    props.loadChat(location.pathname.slice("/chat/".length));
  }, []); //Only in first load

  return (
    <div className={s.chat}>
      <div className={s.chatTop}>
        <div className={s.backBtn}>
          <div>
            <ArrowBackIosIcon />
          </div>
          <span>Back</span>
        </div>
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
        <div className={s.chatSmile}>
          <InsertEmoticonIcon fontSize="large" style={{ color: "gold" }} />
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
  );
}

export default ChatPage;
