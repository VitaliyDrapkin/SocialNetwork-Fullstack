import { connect } from "react-redux";
import { PostsRequests } from "../../../../../../API/PostsRequests";
import {
  addCommentAC,
  deletePostAC,
  likePostAC,
  unlikePostAC,
} from "../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../redux/store";
import PostItem from "./PostItem";

let mapStateToProps = (state: RootState) => {
  return {
    userId: state.authData.id,
    userFirstName: state.authData.firstName,
    userLastName: state.authData.lastName,
    profileImg: state.authData.profileImage,
  };
};

let mapDispatchToProps = (dispatch: any) => {
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

const PostItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);

export default PostItemContainer;
