import React, { ChangeEvent, useState } from "react";
import s from "./EditPost.module.css";
import Avatar from "@material-ui/core/Avatar";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Post } from "../../../../models/post";
import { dateShowCalculate } from "../../../../services/dateShowCalculate";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";
import EmojiPicker from "../EmojiPicker";
import { connect } from "react-redux";
import { actionsTypes } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import { Dispatch } from "react";
import {
  cancelEditPostModeAC,
  endEditPostModeAC,
} from "../../../../redux/actionTypes";
import { addFileServer } from "../../../../services/uploadFiles";
import { PostsRequests } from "../../../../API/PostsRequests";

interface OwnProps {
  post: Post;
}

interface PropsFromState {
  posts: Post[];
  profileImage: string;
}

interface PropsFromDispatch {
  cancelEditMode(postId: string): void;
  savePostChange(
    postId: string,
    text: string,
    postImage: string,
    oldPostImage: string,
    newFile: File
  ): void;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function EditPost(props: AllProps) {
  const [postText, setPostText] = useState(props.post.text);
  const [postImage, setPostImage] = useState(props.post.postImgUrl);
  const [newImageFile, setNewImageFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      setPostImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={s.post}>
      <div className={s.postTop}>
        <div className={s.postInformation}>
          <div className={s.avatar}>
            <Avatar
              src={props.post.userProfileImg}
              style={{
                height: "60px",
                width: "60px",
                border: "1px solid #A4ABB265",
              }}
            />
          </div>
          <div className={s.information}>
            <div className={s.name}>
              {props.post.userFirstName} {props.post.userLastName}
            </div>
            <div className={s.time}>{dateShowCalculate(props.post.date)}</div>
          </div>
        </div>
        <div className={s.addItems}>
          <div className={s.smile} onClick={() => setShowEmojiPicker(true)}>
            {showEmojiPicker && (
              <div className={s.emojiPicker}>
                <EmojiPicker
                  closePicker={() => setShowEmojiPicker(false)}
                  onAddEmoji={(emoji: string) => setPostText(postText + emoji)}
                />
              </div>
            )}
            <InsertEmoticonIcon
              style={{ color: "#536872", width: "35px", height: "35px" }}
            />
          </div>
          <div className={s.photo}>
            <input
              type="file"
              multiple={false}
              accept="image/*"
              className={s.photoInput}
              onChange={onAddImage}
            />
            <AddAPhotoIcon
              style={{ color: "#536872", width: "35px", height: "35px" }}
            />
          </div>
        </div>
      </div>
      <div className={s.postContent}>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      {postImage && (
        <div className={s.postPhoto}>
          <div className={s.removeImage} onClick={() => setPostImage(null)}>
            <ClearIcon
              style={{ color: "white", width: "40px", height: "40px" }}
            />
          </div>
          <img src={postImage} alt="" />
        </div>
      )}
      <div className={s.buttons}>
        <button
          className={s.cancelBTN}
          onClick={() => {
            props.cancelEditMode(props.post.id);
          }}
        >
          Cancel
        </button>
        <button
          className={s.saveBTN}
          onClick={() => {
            props.savePostChange(
              props.post.id,
              postText,
              postImage,
              props.post.postImgUrl,
              newImageFile
            );
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    posts: state.postsData.posts,
    profileImage: state.authData.profileImage,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
