import { Dispatch } from "react";
import { connect } from "react-redux";
import { PostsRequests } from "../../../../../../../../API/PostsRequests";
import {
  deleteCommentAC,
  actionsTypes,
} from "../../../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../../../redux/store";
import CommentItem from "./CommentItem";

let mapStateToProps = (state: RootState) => {
  return {};
};

let mapDispatchToProps = (dispatch: Dispatch<actionsTypes>) => {
  return {
    deleteComment: async (postId: string, commentId: string) => {
      await PostsRequests.deleteComment(postId, commentId);
      dispatch(deleteCommentAC(postId, commentId));
    },
  };
};

const CommentItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);

export default CommentItemContainer;
