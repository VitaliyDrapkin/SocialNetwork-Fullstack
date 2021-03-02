import React, { useEffect } from "react";
import AddPostContainer from "./AddPost/AddPostContainer";
import PostItemContainer from "./Post/PostItemContainer";
import s from "./MainPage.module.css";
import { Post } from "../../../../../models/post";
import EditPostContainer from "./EditPost/EditPostContainer";

interface MainPageProps {
  posts: Post[];
  setPosts(): Promise<void>;
}
function MainPage(props: MainPageProps) {
  useEffect(() => {
    props.setPosts();
  }, []); //Only if first load

  return (
    <div className={s.mainPage}>
      <AddPostContainer />
      <div className={s.posts}>
        {props.posts.map((post) => {
          if (post.editMode) {
            return <EditPostContainer post={post} key={post.id} />;
          }
          return <PostItemContainer post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
}

export default MainPage;
