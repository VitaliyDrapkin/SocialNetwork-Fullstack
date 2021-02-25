import React, { useState } from "react";
import s from "./CommentItem.module.css";
import Avatar from "@material-ui/core/Avatar";
import profilePicture from "../../../../../../../../assets/images/profilePicture.jpg";
import ClearIcon from "@material-ui/icons/Clear";
import { dateShowCalculate } from "../../../../../../../Helpers/dateShowCalculate";
import ModalConfirm from "../../../../../../../Helpers/ModalConfirm/ModalConfirm";
import { Comment } from "../../../../../../../../Model/post";

interface CommentItemProps {
  comment: Comment;
  postId: string;
  deleteComment(postId: string, commentId: string): Promise<void>;
}
function CommentItem(props: CommentItemProps) {
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  return (
    <div className={s.comment}>
      <div className={s.avatar}>
        <Avatar src={props.comment.userId.profileImage} />
      </div>
      <div className={s.main}>
        <div className={s.commentInfo}>
          <div className={s.userName}>
            {props.comment.userId.firstName} {props.comment.userId.lastName}
          </div>
          <div className={s.commentDate}>
            {dateShowCalculate(props.comment.date)}
          </div>
        </div>
        <div className={s.text}>{props.comment.text}</div>
      </div>

      <div className={s.delete}>
        <ClearIcon
          onClick={() => setOpenConfirmWindow(true)}
          fontSize="small"
          className={s.deleteComponent}
          style={{ color: "#6F767E" }}
        />
      </div>
      {openConfirmWindow && (
        <ModalConfirm
          questionText={"Delete comment?"}
          secondaryText={"Are you sure you want to delete this comment?"}
          cancel={() => setOpenConfirmWindow(false)}
          confirm={() => {
            props.deleteComment(props.postId, props.comment._id);
            setOpenConfirmWindow(false);
          }}
        />
      )}
    </div>
  );
}

export default CommentItem;
