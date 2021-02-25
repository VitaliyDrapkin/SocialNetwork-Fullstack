import { connect } from "react-redux";
import { PostsRequests } from "../../../../../../API/PostsRequests";
import {
  actionsTypes,
  addPostImageAC,
} from "../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../redux/store";
import { Dispatch } from "react";

import {
  addPostAC,
  changePostInputAC,
  addEmojiInputAC,
} from "../../../../../../redux/actionTypes";
import AddPost from "./AddPost";
import { addFileServer } from "../../../../../Helpers/uploadFiles";

interface mapStateToPropsType {
  postInputValue: string;
  postImage: string;
  postImageFile: File;
  userFirstName: string;
  userLastName: string;
  profileImage: string;
}
interface mapDispatchToPropsType {
  addPost(
    text: string,
    userFirstName: string,
    userLastName: string,
    profileImage: string,
    file?: File
  ): Promise<void>;
  changePostInput(text: string): void;
  addEmoji(emoji: string): void;
  addPostImage(file: File): void;
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    postInputValue: state.postsData.postInputValue,
    postImage: state.postsData.postImage,
    postImageFile: state.postsData.postImageFile,
    userFirstName: state.authData.firstName,
    userLastName: state.authData.lastName,
    profileImage: state.authData.profileImage,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    changePostInput: (text: string): void => {
      dispatch(changePostInputAC(text));
    },
    addEmoji: (emoji: string): void => {
      dispatch(addEmojiInputAC(emoji));
    },
    addPost: async (
      text: string,
      userFirstName: string,
      userLastName: string,
      profileImage: string,
      file?: File
    ) => {
      const date = new Date().getTime();
      let fileURL: string = "";
      if (file) {
        fileURL = await addFileServer(file);
      }
      const postId = await PostsRequests.addPost(text, date, fileURL);
      dispatch(addPostAC(postId, userFirstName, userLastName, profileImage));
    },
    addPostImage: (file: File) => {
      //add image to redux
      const fileURL = URL.createObjectURL(file);
      dispatch(addPostImageAC(fileURL, file));
    },
  };
};

interface mergePropsType {
  postInputValue: string;
  addPost(): void;
  changePostInput(text: string): void;
  addEmoji(emoji: string): void;
}

let mergeProps = (
  stateProps: mapStateToPropsType,
  dispatchProps: mapDispatchToPropsType,
  ownProps: any
): mapStateToPropsType | mapDispatchToPropsType | mergePropsType => {
  return {
    ...stateProps,
    ...dispatchProps,
    addPost: () => {
      dispatchProps.addPost(
        stateProps.postInputValue,
        stateProps.userFirstName,
        stateProps.userLastName,
        stateProps.profileImage,
        stateProps.postImageFile
      );
    },
  };
};

const AddPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AddPost);

export default AddPostContainer;
