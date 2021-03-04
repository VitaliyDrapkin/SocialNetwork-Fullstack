import React, { useState, useRef, MouseEvent, Dispatch } from "react";
import { NavLink } from "react-router-dom";
import s from "./Post.module.css";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Box from "@material-ui/core/Box";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { Post } from "../../../../models/post";
import EmojiPicker from "../EmojiPicker";
import ModalConfirm from "../../../shared/ModalConfirm";
import MenuPost from "../MenuPost";
import Comments from "../Comments/Comments";
import { dateShowCalculate } from "../../../../services/dateShowCalculate";
import {
  actionsTypes,
  addCommentAC,
  deletePostAC,
  likePostAC,
  unlikePostAC,
} from "../../../../redux/actionTypes";
import { PostsRequests } from "../../../../API/PostsRequests";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";

interface OwnProps {
  post: Post;
}

interface PropsFromState {
  userId: string;
  userFirstName: string;
  userLastName: string;
  profileImg: string;
}

interface PropsFromDispatch {
  deletePost(postId: string): void;
  addComment(
    postId: string,
    text: string,
    userId: string,
    userFirstName: string,
    userLastName: string,
    profileImage: string
  ): void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function PostItem(props: AllProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputCommentValue, setInputCommentValue] = useState("");

  const inputEl = useRef(null);

  const addComment = () => {
    props.addComment(
      props.post.id,
      inputCommentValue,
      props.userId,
      props.userFirstName,
      props.userLastName,
      props.profileImg
    );
    setInputCommentValue("");
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [sendHover, setSendHover] = useState(false);
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
            <NavLink
              to={`/profile/${props.post.userId}`}
              className={s.name}
              style={{ margin: 0, outline: "none" }}
            >
              {props.post.userFirstName} {props.post.userLastName}
            </NavLink>
            <div className={s.time}>{dateShowCalculate(props.post.date)}</div>
          </div>
        </div>
        {props.post.ownPost && (
          <div className={s.postSetting} onClick={handleClick}>
            <ExpandMoreIcon fontSize="large" style={{ color: "#C1C5CC" }} />
          </div>
        )}
      </div>
      <div className={s.postContent}>{props.post.text}</div>
      {props.post.postImgUrl && (
        <div className={s.postPhoto}>
          <img src={props.post.postImgUrl} alt="" />
        </div>
      )}
      <div className={s.likesComments}>
        {props.post.liked ? (
          <div
            className={s.likes}
            onClick={() => props.unlikePost(props.post.id)}
          >
            <ThumbUpAltIcon fontSize="large" style={{ color: "blue" }} />
            <span>{props.post.likes}</span>
          </div>
        ) : (
          <div
            className={s.likes}
            onClick={() => props.likePost(props.post.id)}
          >
            <ThumbUpAltOutlinedIcon
              fontSize="large"
              style={{ color: "#6F757D" }}
            />
            <span>{props.post.likes}</span>
          </div>
        )}
        <div
          className={s.commentsCount}
          onClick={() => inputEl.current.focus()}
        >
          <Box pt={2}>
            <ChatBubbleOutlineIcon fontSize="large" />
          </Box>
          <span>{props.post.comments.length}</span>
        </div>
      </div>
      {props.post.comments.length > 0 && (
        <Comments comments={props.post.comments} postId={props.post.id} />
      )}
      <div className={s.writeComment}>
        <div className={s.avatarComment}>
          <Avatar src={props.profileImg} />
        </div>
        <div className={s.input}>
          <input
            ref={inputEl}
            type="text"
            placeholder="Write a comment..."
            maxLength={150}
            value={inputCommentValue}
            onChange={(e) => setInputCommentValue(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && addComment()}
          />
        </div>
        <div className={s.addSmile} onClick={() => setShowEmojiPicker(true)}>
          {showEmojiPicker && (
            <div className={s.emojiPicker}>
              <EmojiPicker
                closePicker={() => setShowEmojiPicker(false)}
                onAddEmoji={(emoji: string) =>
                  setInputCommentValue(inputCommentValue + emoji)
                }
              />
            </div>
          )}
          <InsertEmoticonIcon fontSize="large" style={{ color: "gold" }} />
        </div>
        <div
          className={s.sendButton}
          onClick={addComment}
          onMouseOver={() => setSendHover(true)}
          onMouseOut={() => setSendHover(false)}
        >
          {sendHover ? (
            <SendRoundedIcon fontSize="large" style={{ color: "#4A76CB" }} />
          ) : (
            <SendRoundedIcon fontSize="large" style={{ color: "grey" }} />
          )}
        </div>
      </div>
      <MenuPost
        anchorEl={anchorEl}
        onCLose={() => setAnchorEl(null)}
        onDelete={() => setOpenConfirmWindow(true)}
        postId={props.post.id}
      />
      {openConfirmWindow && (
        <ModalConfirm
          questionText={"Delete post?"}
          secondaryText={"Are you sure you want to delete this post?"}
          cancel={() => setOpenConfirmWindow(false)}
          confirm={() => props.deletePost(props.post.id)}
        />
      )}
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    userId: state.authData.id,
    userFirstName: state.authData.firstName,
    userLastName: state.authData.lastName,
    profileImg: state.authData.profileImage,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    deletePost: async (postId: string) => {
      await PostsRequests.deletePost(postId);
      dispatch(deletePostAC(postId));
    },
    addComment: async (
      postId: string,
      text: string,
      userId: string,
      userFirstName: string,
      userLastName: string,
      profileImage: string
    ) => {
      if (!text) {
        return;
      }
      const date = new Date().getTime();
      const commentId = await PostsRequests.addComment(text, date, postId);
      dispatch(
        addCommentAC(
          postId,
          text,
          date,
          commentId,
          userId,
          userFirstName,
          userLastName,
          profileImage
        )
      );
    },
    likePost: async (postId: string) => {
      await PostsRequests.addLike(postId);
      dispatch(likePostAC(postId));
    },
    unlikePost: async (postId: string) => {
      await PostsRequests.removeLike(postId);
      dispatch(unlikePostAC(postId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
