import React from "react";
import s from "./MessagesPage.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MessagesItem from "./MessagesItem/MessagesItem";

function MessagesPage() {
  return (
    <div className={s.messagesPage}>
      <div className={s.title}>
        <div className={s.titleText}>
          <span>Messages</span>
        </div>
        <div className={s.editIcon}>
          <AddCircleOutlineIcon fontSize="large" />
        </div>
      </div>

      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
      <MessagesItem />
    </div>
  );
}

export default MessagesPage;
