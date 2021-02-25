import React, { useState, ChangeEvent } from "react";
import s from "./AddPost.module.css";
import Avatar from "@material-ui/core/Avatar";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EmojiPicker from "../../../../../Helpers/EmojiPicker/EmojiPicker";

interface AddPostProps {
  postInputValue: string;
  addPost(): Promise<void>;
  changePostInput(text: string): void;
  addEmoji(emoji: string): void;
  addPostImage(file: File): void;
  postImage: string;
  userFirstName: string;
  profileImage: string;
}

function AddPost(props: AddPostProps) {
  console.log(props);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      props.addPostImage(e.target.files[0]);
    }
  };
  return (
    <div className={s.addPost}>
      <div className={s.addPostMain}>
        <div className={s.avatar}>
          <Avatar
            src={props.profileImage}
            style={{
              height: "60px",
              width: "60px",
              border: "1px solid #A4ABB265",
            }}
          />
        </div>
        <textarea
          name="postText"
          placeholder={"Whats on your mind, " + props.userFirstName + "?"}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            props.changePostInput(event.target.value)
          }
          value={props.postInputValue}
        />
      </div>
      {props.postImage && (
        <div className={s.postImage}>
          <img src={props.postImage} alt="" />
        </div>
      )}
      <div className={s.addPostButtons}>
        <div className={s.addItems}>
          <div className={s.smile} onClick={() => setShowEmojiPicker(true)}>
            <InsertEmoticonIcon
              style={{ color: "#536872", width: "50px", height: "50px" }}
            />
            {showEmojiPicker && (
              <EmojiPicker
                closePicker={() => setShowEmojiPicker(false)}
                onAddEmoji={props.addEmoji}
              />
            )}
          </div>
          <div className={s.photo}>
            <input
              type="file"
              multiple={false}
              className={s.photoInput}
              onChange={onAddImage}
              accept="image/*"
            />
            <AddAPhotoIcon
              style={{ color: "#536872", width: "50px", height: "50px" }}
            />
          </div>
        </div>
        <div className={s.button}>
          <button onClick={props.addPost}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
