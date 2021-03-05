import React, { useState } from "react";
import s from "./CommentItem.module.css";
import Avatar from "@material-ui/core/Avatar";
import ClearIcon from "@material-ui/icons/Clear";
import { dateShowCalculate } from "../../../../services/dateShowCalculate";
import ModalConfirm from "../../../shared/ModalConfirm/ModalConfirm";
import { Dispatch } from "react";
import { connect } from "react-redux";
import { PostsRequests } from "../../../../API/PostsRequests";
import { deleteCommentAC, actionsTypes } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import { CommentVM } from "../../../../models/view-models/post.vm";

interface OwnProps {
  comment: CommentVM;
  postId: string;
}

interface PropsFromState {}

interface PropsFromDispatch {
  deleteComment(postId: string, commentId: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function CommentItem(props: AllProps) {
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

let mapStateToProps = (state: RootState) => {
  return {};
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    deleteComment: async (postId: string, commentId: string) => {
      await PostsRequests.deleteComment(postId, commentId);
      dispatch(deleteCommentAC(postId, commentId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
