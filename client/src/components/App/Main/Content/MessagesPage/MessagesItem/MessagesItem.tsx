import React, { useState } from "react";
import s from "./MessagesItem.module.css";
import Avatar from "@material-ui/core/Avatar";
import profilePicture from "../../../../../../assets/images/profilePicture.jpg";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

function MessagesItem() {
  const [showDeleteBTN, setsHowDeleteBTN] = useState(false);
  const [hoverColor, setHoverColor] = useState(false);
  return (
    <NavLink
      style={{ textDecoration: "none" }}
      to="/chat"
      className={s.messageItem}
      onMouseEnter={() => setsHowDeleteBTN(true)}
      onMouseLeave={() => setsHowDeleteBTN(false)}
    >
      <div className={s.avatar}>
        <Avatar
          src={profilePicture}
          style={{
            width: "60px",
            height: "60px",
            border: "1px solid #A4ABB265",
          }}
        />
      </div>
      <div className={s.main}>
        <div className={s.userName}>Alex Vasiliev</div>
        <div className={s.lastMessage}>Hello my friend how are you?</div>
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
