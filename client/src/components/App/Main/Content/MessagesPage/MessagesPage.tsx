import React, { useEffect } from "react";
import s from "./MessagesPage.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MessagesItem from "./MessagesItem/MessagesItem";
import { MessengerItem } from "../../../../../models/message";

interface MessagesPageProps {
  messengers: MessengerItem[];
  setMessengers(): Promise<void>;
  loaded: boolean;
}
function MessagesPage(props: MessagesPageProps) {
  useEffect(() => {
    props.setMessengers();
  }, []); //Only if first load

  return props.loaded ? (
    <div className={s.messagesPage}>
      <div className={s.title}>
        <div className={s.titleText}>
          <span>Messages</span>
        </div>
        <div className={s.editIcon}>
          <AddCircleOutlineIcon fontSize="large" />
        </div>
      </div>
      {props.messengers.map((messenger) => (
        <MessagesItem
          userId={messenger.userId}
          firstName={messenger.userFirstName}
          lastName={messenger.userLastName}
          profileImg={messenger.profileImg}
          lastMessage={messenger.lastMessage}
        />
      ))}
    </div>
  ) : null;
}

export default MessagesPage;
