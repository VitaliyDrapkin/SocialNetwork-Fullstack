import { actionsTypes } from "./actionTypes";
import { Post, Comment } from "./../models/post";

export const CHANGE_POST_INPUT = "CHANGE_POST_INPUT";
export const ADD_EMOJI_INPUT = "ADD_EMOJI_INPUT";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const START_EDIT_MODE_POST = "START_EDIT_MODE_POST";
export const CANCEL_EDIT_MODE_POST = "CANCEL_EDIT_MODE_POST";
export const END_EDIT_MODE_POST = "END_EDIT_MODE_POST";
export const DELETE_POST = "DELETE_POST";
export const SET_POSTS = "SET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_POST_IMAGE = "ADD_POST_IMAGE";
export const SET_PROFILE_DATA = "SET_PROFILE_DATA";

export interface initialStateType {
  posts: Post[];
  postInputValue: string;
  postImage: string;
  postImageFile: File | null;
}

let initialState: initialStateType = {
  posts: [],
  postInputValue: "",
  postImage: "",
  postImageFile: null,
};

export function postPageReducer(
  oldAppState: initialStateType = initialState,
  action: actionsTypes
): initialStateType {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...oldAppState,
        posts: [...action.posts],
      };
    case ADD_NEW_POST:
      const newPost: Post = {
        id: action.postId,
        userId: action.userId,
        userProfileImg: action.profileImage,
        userFirstName: action.firstName,
        userLastName: action.lastName,
        date: new Date().getTime(),
        text: oldAppState.postInputValue,
        postImgUrl: oldAppState.postImage,
        likes: 0,
        liked: false,
        comments: [],
        ownPost: true,
        editMode: false,
      };
      return {
        ...oldAppState,
        posts: [newPost, ...oldAppState.posts],
        postInputValue: "",
        postImage: "",
        postImageFile: null,
      };
    case DELETE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.filter((post) => {
            return post.id !== action.postId;
          }),
        ],
      };
    case START_EDIT_MODE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return { ...post, editMode: true };
            } else return post;
          }),
        ],
      };
    case CANCEL_EDIT_MODE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return { ...post, editMode: false };
            } else return post;
          }),
        ],
      };
    case END_EDIT_MODE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                editMode: false,
                text: action.text,
                postImgUrl: action.imgURL,
              };
            } else return post;
          }),
        ],
      };
    case LIKE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return { ...post, likes: post.likes + 1, liked: true };
            } else return post;
          }),
        ],
      };
    case UNLIKE_POST:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return { ...post, likes: post.likes - 1, liked: false };
            } else return post;
          }),
        ],
      };
    case ADD_COMMENT:
      const UserComment = {
        _id: action.userComment._id,
        firstName: action.userComment.userFirstName,
        lastName: action.userComment.userLastName,
        profileImage: action.userComment.profileImage,
      };
      const newComment = new Comment(
        action.commentId,
        action.comment,
        action.date,
        UserComment
      );

      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                comments: [...post.comments, newComment],
              };
            } else return post;
          }),
        ],
      };
    case DELETE_COMMENT:
      return {
        ...oldAppState,
        posts: [
          ...oldAppState.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                comments: [
                  ...post.comments.filter((comment) => {
                    return comment._id !== action.commentId;
                  }),
                ],
              };
            } else return post;
          }),
        ],
      };
    case CHANGE_POST_INPUT:
      return { ...oldAppState, postInputValue: action.text };
    case ADD_EMOJI_INPUT:
      return {
        ...oldAppState,
        postInputValue: oldAppState.postInputValue + action.emoji,
      };
    case ADD_POST_IMAGE:
      return {
        ...oldAppState,
        postImage: action.image,
        postImageFile: action.imageFile,
      };
    case SET_PROFILE_DATA:
      return {
        ...oldAppState,
        posts: action.posts,
      };
    default:
      return oldAppState;
  }
}
