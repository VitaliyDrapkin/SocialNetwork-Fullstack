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
  userId: string;
  userFirstName: string;
  userLastName: string;
  profileImage: string;
}
interface mapDispatchToPropsType {
  addPost(
    text: string,
    userId: string,
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
    userId: state.authData.id,
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
      userId: string,
      userFirstName: string,
      userLastName: string,
      profileImage: string,
      file?: File
    ) => {
      if (!text) {
        return;
      }
      const date = new Date().getTime();
      let fileURL: string = "";
      if (file) {
        fileURL = await addFileServer(file);
      }
      const postId = await PostsRequests.addPost(text, date, fileURL);
      dispatch(
        addPostAC(postId, userId, userFirstName, userLastName, profileImage)
      );
    },
    addPostImage: (file: File) => {
      //add image to redux
      const fileURL = URL.createObjectURL(file);
      dispatch(addPostImageAC(fileURL, file));
    },
  };
};

const AddPostContainer = connect(mapStateToProps, mapDispatchToProps)(AddPost);

export default AddPostContainer;
