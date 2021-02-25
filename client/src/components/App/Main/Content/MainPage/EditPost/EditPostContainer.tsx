import { connect } from "react-redux";
import EditPost from "./EditPost";
import { actionsTypes } from "../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../redux/store";
import { Dispatch } from "react";
import {
  cancelEditPostModeAC,
  endEditPostModeAC,
} from "../../../../../../redux/actionTypes";
import { addFileServer } from "../../../../../Helpers/uploadFiles";
import { PostsRequests } from "../../../../../../API/PostsRequests";

interface mapDispatchToPropsType {
  cancelEditMode(postId: string): void;
  savePostChange(
    postId: string,
    text: string,
    postImage: string,
    oldPostImage: string,
    newFile: File
  ): void;
}
let mapStateToProps = (state: RootState) => {
  return {
    posts: state.postsData.posts,
    profileImage: state.authData.profileImage,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    cancelEditMode: (postId: string) => {
      dispatch(cancelEditPostModeAC(postId));
    },
    savePostChange: async (
      postId: string,
      text: string,
      postImage: string,
      oldPostImage: string,
      newFile: File
    ) => {
      let fileURL = "-1";
      if (postImage && oldPostImage !== postImage) {
        fileURL = await addFileServer(newFile);
      } else if (oldPostImage !== postImage) {
        fileURL = "";
      }
      PostsRequests.editPost(postId, text, fileURL);
      dispatch(endEditPostModeAC(postId, text, postImage));
    },
  };
};

const EditPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

export default EditPostContainer;
