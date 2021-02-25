import React from "react";
import s from "./ChatItem.module.css";

interface ChatItemProps {
  ownMessage: boolean;
  message: string;
}
function ChatItem(props: ChatItemProps) {
  return (
    <div className={s.chatItem}>
      {props.ownMessage ? (
        <div className={s.ownMessage}>
          <span>{props.message}</span>
        </div>
      ) : (
        <div className={s.notOwnMessage}>
          <span>{props.message}</span>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
