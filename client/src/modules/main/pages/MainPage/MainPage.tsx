import React, { useEffect, Dispatch } from "react";
import { connect } from "react-redux";
import { PostsRequests } from "../../../../API/PostsRequests";
import AddPost from "../../components/AddPost";
import EditPost from "../../components/EditPost";
import PostItem from "../../components/PostItem";
import { Post } from "../../../../models/post";
import { actionsTypes, setPostsAC } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import s from "./MainPage.module.css";

interface OwnProps {}

interface PropsFromState {
  posts: Post[];
}

interface PropsFromDispatch {
  setPosts(): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function MainPage(props: AllProps) {
  useEffect(() => {
    props.setPosts();
  }, []); //Only if first load

  return (
    <div className={s.mainPage}>
      <AddPost />
      <div className={s.posts}>
        {props.posts.map((post) => {
          if (post.editMode) {
            return <EditPost post={post} key={post.id} />;
          }
          return <PostItem post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    posts: state.postsData.posts,
    // userProfileImage:
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    setPosts: async () => {
      const posts = await PostsRequests.getAllPosts();
      dispatch(setPostsAC(posts));
    },
  };
};

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
