import React, { useState } from "react";
import s from "./FriendItem.module.css";
import Avatar from "@material-ui/core/Avatar";
import profilePicture from "../../../../../../assets/images/profilePicture.jpg";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import { Friend } from "../../../../models/friend";
import { useRequestFriends } from "./useRequestFriends";
import { FriendsRequests } from "../../../../API/FriendsRequests";
import ModalConfirm from "../../../shared/ModalConfirm/ModalConfirm";

interface OwnProps {
  friend: Friend;
  type: string;
  deleteFriend?(friendId: string): Promise<void>;
}
function FriendItem(props: OwnProps) {
  const [showDeleteBTN, setsHowDeleteBTN] = useState(false);
  const [hoverColor, setHoverColor] = useState(false);
  const [hoverColorSecond, setHoverColorSecond] = useState(false);
  const [requestConfirmed, setRequestConfirmed] = useState(false);
  const [showConfirmWindow, setShowConfirmWindow] = useState(false);
  const { requestSent, setRequest, error } = useRequestFriends(
    props.type === "sentRequests"
  );
  return (
    <div
      className={s.friendItem}
      onMouseEnter={() => setsHowDeleteBTN(true)}
      onMouseLeave={() => setsHowDeleteBTN(false)}
    >
      <div className={s.friendsLeft}>
        <div className={s.avatar}>
          <Avatar
            style={{ width: "100px", height: "100px" }}
            src={props.friend.profileImg}
          />
        </div>
        <div className={s.main}>
          <div className={s.name}>
            <NavLink to={`/profile/${props.friend._id}`}>
              {props.friend.firstName} {props.friend.lastName}
            </NavLink>
          </div>
          <div className={s.status}>{props.friend.status}</div>
          <div className={s.sendMessage}>
            <NavLink to={`/chat/${props.friend._id}`}>Send message</NavLink>
          </div>
        </div>
      </div>
      {props.type === "myFriends" || props.type === "sentRequests" ? (
        requestSent ? (
          <div
            className={s.addFriendBTN}
            onMouseOver={() => setHoverColor(true)}
            onMouseOut={() => setHoverColor(false)}
            onClick={() => setRequest(false, props.friend._id)}
          >
            {hoverColor ? (
              <PersonAddDisabledIcon
                fontSize="large"
                style={{ color: "#939393" }}
              />
            ) : (
              <PersonAddDisabledIcon
                fontSize="large"
                style={{ color: "#BFC1C5" }}
              />
            )}
          </div>
        ) : (
          <div
            className={s.addFriendBTN}
            onMouseOver={() => setHoverColor(true)}
            onMouseOut={() => setHoverColor(false)}
            onClick={() => setRequest(true, props.friend._id)}
          >
            {hoverColor ? (
              <PersonAddIcon fontSize="large" style={{ color: "#5181B8" }} />
            ) : (
              <PersonAddIcon fontSize="large" style={{ color: "#A4B9D0" }} />
            )}
          </div>
        )
      ) : props.type === "receivedRequests" ? (
        !requestConfirmed && (
          <div className={s.newIcons}>
            <div
              className={s.confirmBTN}
              onMouseOver={() => setHoverColor(true)}
              onMouseOut={() => setHoverColor(false)}
              onClick={() => {
                setRequestConfirmed(true);
                FriendsRequests.confirmRequest(props.friend._id);
              }}
            >
              {hoverColor ? (
                <PersonAddIcon fontSize="large" style={{ color: "#5181B8" }} />
              ) : (
                <PersonAddIcon fontSize="large" style={{ color: "#A4B9D0" }} />
              )}
            </div>
            <div
              className={s.cancelBTN}
              onMouseOver={() => setHoverColorSecond(true)}
              onMouseOut={() => setHoverColorSecond(false)}
              onClick={() => {
                setRequestConfirmed(true);
                FriendsRequests.cancelRequest(props.friend._id);
              }}
            >
              {hoverColorSecond ? (
                <PersonAddDisabledIcon
                  fontSize="large"
                  style={{ color: "#939393" }}
                />
              ) : (
                <PersonAddDisabledIcon
                  fontSize="large"
                  style={{ color: "#BFC1C5" }}
                />
              )}
            </div>
          </div>
        )
      ) : (
        <div
          className={s.deleteBTN}
          onMouseOver={() => setHoverColor(true)}
          onMouseOut={() => setHoverColor(false)}
          onClick={() => setShowConfirmWindow(true)}
        >
          {showDeleteBTN && hoverColor ? (
            <DeleteIcon style={{ color: "orangered" }} />
          ) : showDeleteBTN ? (
            <DeleteIcon style={{ color: "grey" }} />
          ) : null}
        </div>
      )}
      {showConfirmWindow && (
        <ModalConfirm
          confirm={() => {
            setShowConfirmWindow(false);
            props.deleteFriend(props.friend._id);
          }}
          cancel={() => setShowConfirmWindow(false)}
          questionText="Delete friend?"
          secondaryText="Are you sure you want to delete this friend?"
        />
      )}
    </div>
  );
}

export default FriendItem;
