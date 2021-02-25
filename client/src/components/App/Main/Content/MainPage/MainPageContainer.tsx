import { connect } from "react-redux";
import MainPage from "./MainPage";
import { PostsRequests } from "../../../../../API/PostsRequests";
import { actionsTypes, setPostsAC } from "../../../../../redux/actionTypes";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "react";
import { Post } from "../../../../../Model/post";

interface mapStateToPropsType {
  posts: Post[];
}

interface mapDispatchToPropsType {
  setPosts(): Promise<void>;
}
let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    posts: state.postsData.posts,
    // userProfileImage:
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    setPosts: async () => {
      const posts = await PostsRequests.getAllPosts();
      dispatch(setPostsAC(posts));
    },
  };
};

const MainPageContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
export default MainPageContainer;
