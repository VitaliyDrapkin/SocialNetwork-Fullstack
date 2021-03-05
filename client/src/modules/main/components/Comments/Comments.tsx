import React, { useState } from "react";
import s from "./Comments.module.css";
import CommentItem from "../CommentItem";
import { CommentVM } from "../../../../models/view-models/post.vm";

interface OwnProps {
  comments: CommentVM[];
  postId: string;
}
function Comments(props: OwnProps) {
  const [viewMoreClicked, setViewMoreClicked] = useState(false);

  return (
    <div>
      {viewMoreClicked ? (
        <div className={s.comments}>
          {props.comments.length > 1 && (
            <div
              className={s.viewMore}
              onClick={() => setViewMoreClicked(false)}
            >
              Hide comments
            </div>
          )}
          {props.comments.map((comment: CommentVM) => {
            return <CommentItem comment={comment} postId={props.postId} />;
          })}
        </div>
      ) : (
        <div className={s.comments}>
          {props.comments.length > 1 &&
            (props.comments.length === 2 ? (
              <div
                className={s.viewMore}
                onClick={() => setViewMoreClicked(true)}
              >
                View 1 more comment
              </div>
            ) : (
              <div
                className={s.viewMore}
                onClick={() => setViewMoreClicked(true)}
              >
                View {props.comments.length - 1} more comments
              </div>
            ))}
          <CommentItem
            comment={props.comments[props.comments.length - 1]}
            postId={props.postId}
          />
        </div>
      )}
    </div>
  );
}

export default Comments;
