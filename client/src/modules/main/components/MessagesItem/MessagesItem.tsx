import React, { useState } from "react";
import s from "./MessagesItem.module.css";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

interface OwnProps {
  firstName: string;
  lastName: string;
  profileImg: string;
  userId: string;
  lastMessage: string;
}
function MessagesItem(props: OwnProps) {
  const [showDeleteBTN, setsHowDeleteBTN] = useState(false);
  const [hoverColor, setHoverColor] = useState(false);
  return (
    <NavLink
      style={{ textDecoration: "none" }}
      to={`/chat/${props.userId}`}
      className={s.messageItem}
      onMouseEnter={() => setsHowDeleteBTN(true)}
      onMouseLeave={() => setsHowDeleteBTN(false)}
    >
      <div className={s.avatar}>
        <Avatar
          src={props.profileImg}
          style={{
            width: "60px",
            height: "60px",
            border: "1px solid #A4ABB265",
          }}
        />
      </div>
      <div className={s.main}>
        <div className={s.userName}>
          {props.firstName} {props.lastName}
        </div>
        <div className={s.lastMessage}>{props.lastMessage}</div>
      </div>
      <div
        className={s.deleteBTN}
        onMouseOver={() => setHoverColor(true)}
        onMouseOut={() => setHoverColor(false)}
      >
        {showDeleteBTN && hoverColor ? (
          <DeleteIcon style={{ color: "orangered" }} />
        ) : showDeleteBTN ? (
          <DeleteIcon style={{ color: "grey" }} />
        ) : null}
      </div>
    </NavLink>
  );
}

export default MessagesItem;
