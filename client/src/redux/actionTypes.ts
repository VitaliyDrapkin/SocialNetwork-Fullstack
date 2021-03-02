import { MessengerItem } from "./../Model/message";
import {
  CHANGE_POST_INPUT,
  ADD_EMOJI_INPUT,
  ADD_NEW_POST,
  SET_POSTS,
  DELETE_POST,
  START_EDIT_MODE_POST,
  CANCEL_EDIT_MODE_POST,
  END_EDIT_MODE_POST,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST_IMAGE,
} from "./postsReducer";

import {
  AUTHORIZATION,
  REFRESH_TOKEN,
  INITIALIZE,
  CHANGE_PROFILE_IMAGE,
} from "./authReducer";

import {
  START_LOAD_PROFILE,
  PROFILE_LOADED,
  SET_PROFILE_DATA,
  CHANGE_PROFILE_STATUS,
  CHANGE_PROFILE_LIVES,
  CHANGE_PROFILE_BIRTHDAY,
  CHANGE_PROFILE_RELATIONSHIP,
} from "./profileReducer";
import { Post } from "../Model/post";

import {
  START_LOAD_FRIENDS,
  FRIENDS_PAGE_LOADED,
  SET_FRIENDS_DATA,
  CHANGE_FILTER_VALUE,
  SET_FRIENDS_SEARCH_DATA,
  DELETE_FRIEND,
} from "./friendsReducer";
import { Friend } from "../Model/friend";

import {
  START_LOAD_CHAT,
  SET_CHAT_DATA,
  CHAT_LOADED,
  ADD_MESSAGE,
  MESSENGER_LOADED,
  START_LOAD_MESSENGER,
  SET_MESSENGER_DATA,
} from "./chatReducer";
import { Message } from "../Model/message";

export type actionsTypes =
  | addPostType
  | changePostInputType
  | startEditPostModeType
  | cancelEditPostModeType
  | endEditPostModeType
  | likePostType
  | unlikePostType
  | addCommentType
  | deleteCommentType
  | deletePostType
  | addEmojiInputType
  | setPostsType
  | destroySessionType
  | addPostImageType
  | authorizationType
  | refreshTokenType
  | initializeType
  | startLoadProfileType
  | endLoadProfileType
  | setProfileDataType
  | changeProfileImageType
  | changeProfileStatusType
  | changeProfileLivesType
  | changeProfileBirthdayType
  | changeProfileRelationshipType
  | startLoadMyFriendsType
  | endLoadMyFriendsType
  | setFriendsDataType
  | changeFilterValueType
  | setFriendsSearchDataType
  | deleteFriendType
  | startLoadChatType
  | endLoadChatType
  | setChatDataType
  | addMessageChatType
  | startLoadMessengerType
  | endLoadMessengerType
  | setMessengerDataType;
//Action Creators

type destroySessionType = {
  type: "DESTROY_SESSION";
};

type addMessageChatType = {
  type: typeof ADD_MESSAGE;
  conversationId: string;
  text: string;
  messageId: string;
  isSender: boolean;
};
type startLoadChatType = {
  type: typeof START_LOAD_CHAT;
};
type endLoadChatType = {
  type: typeof CHAT_LOADED;
};

type startLoadMessengerType = {
  type: typeof START_LOAD_MESSENGER;
};
type endLoadMessengerType = {
  type: typeof MESSENGER_LOADED;
};
type setMessengerDataType = {
  type: typeof SET_MESSENGER_DATA;
  messengers: MessengerItem[];
};
type setChatDataType = {
  type: typeof SET_CHAT_DATA;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  companionId: string;
};

type deleteFriendType = {
  type: typeof DELETE_FRIEND;
  friendId: string;
};
type changeFilterValueType = {
  type: typeof CHANGE_FILTER_VALUE;
  filter: string;
};
type startLoadMyFriendsType = {
  type: typeof START_LOAD_FRIENDS;
};
type endLoadMyFriendsType = {
  type: typeof FRIENDS_PAGE_LOADED;
};
type setFriendsDataType = {
  type: typeof SET_FRIENDS_DATA;
  friends: Friend[];
  requestsSent: Friend[];
  requestsReceived: Friend[];
};
type setFriendsSearchDataType = {
  type: typeof SET_FRIENDS_SEARCH_DATA;
  friendsSearch: Friend[];
};

type changePostInputType = {
  type: typeof CHANGE_POST_INPUT;
  text: string;
};

type addEmojiInputType = {
  type: typeof ADD_EMOJI_INPUT;
  emoji: string;
};

type addPostType = {
  type: typeof ADD_NEW_POST;
  postId: string;
  userId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

type setPostsType = {
  type: typeof SET_POSTS;
  posts: Post[];
};

type deletePostType = {
  type: typeof DELETE_POST;
  postId: string;
};

type startEditPostModeType = {
  type: typeof START_EDIT_MODE_POST;
  postId: string;
};

type cancelEditPostModeType = {
  type: typeof CANCEL_EDIT_MODE_POST;
  postId: string;
};
type endEditPostModeType = {
  type: typeof END_EDIT_MODE_POST;
  postId: string;
  text: string;
  imgURL: string;
};

type likePostType = {
  type: typeof LIKE_POST;
  postId: string;
};

type unlikePostType = {
  type: typeof UNLIKE_POST;
  postId: string;
};

type userComment = {
  _id: string;
  userFirstName: string;
  userLastName: string;
  profileImage: string;
};

type addCommentType = {
  type: typeof ADD_COMMENT;
  postId: string;
  comment: string;
  date: number;
  commentId: string;
  userComment: userComment;
};
type deleteCommentType = {
  type: typeof DELETE_COMMENT;
  postId: string;
  commentId: string;
};

type addPostImageType = {
  type: typeof ADD_POST_IMAGE;
  image: string;
  imageFile: File;
};

type authorizationType = {
  type: typeof AUTHORIZATION;
  id: string;
  firstName: string;
  lastName: string;
  birthday: number;
  gender: string;
  accessToken: string;
  profileImage?: string;
};

type refreshTokenType = {
  type: typeof REFRESH_TOKEN;
  accessToken: string;
};

type initializeType = {
  type: typeof INITIALIZE;
};

type startLoadProfileType = {
  type: typeof START_LOAD_PROFILE;
};

type endLoadProfileType = {
  type: typeof PROFILE_LOADED;
};

type setProfileDataType = {
  type: typeof SET_PROFILE_DATA;
  isOwnProfile: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  status: string;
  birthDay: number;
  relationship: string;
  lives: string;
  posts: Post[];
  isFriend: boolean;
  isRequestSent: boolean;
};

type changeProfileImageType = {
  type: typeof CHANGE_PROFILE_IMAGE;
  profileImg: string;
};

type changeProfileStatusType = {
  type: typeof CHANGE_PROFILE_STATUS;
  status: string;
};
type changeProfileLivesType = {
  type: typeof CHANGE_PROFILE_LIVES;
  lives: string;
};

type changeProfileBirthdayType = {
  type: typeof CHANGE_PROFILE_BIRTHDAY;
  birthday: number;
};

type changeProfileRelationshipType = {
  type: typeof CHANGE_PROFILE_RELATIONSHIP;
  relationship: string;
};
//action creators

export const changeFilterValueAC = (filter: string): changeFilterValueType => {
  return {
    type: "CHANGE_FILTER_VALUE",
    filter: filter,
  };
};
export const deleteFriendAC = (friendId: string): deleteFriendType => {
  return {
    type: "DELETE_FRIEND",
    friendId: friendId,
  };
};
export const startLoadMyFriendsAC = (): startLoadMyFriendsType => {
  return {
    type: "START_LOAD_FRIENDS",
  };
};

export const endLoadMyFriendsAC = (): endLoadMyFriendsType => {
  return {
    type: "FRIENDS_PAGE_LOADED",
  };
};

export const setFriendsDataAC = (
  friends: Friend[],
  requestsSent: Friend[],
  requestsReceived: Friend[]
): setFriendsDataType => {
  return {
    type: "SET_FRIENDS_DATA",
    friends: friends,
    requestsSent: requestsSent,
    requestsReceived: requestsReceived,
  };
};
export const setFriendsSearchDataAC = (
  friendsSearch: Friend[]
): setFriendsSearchDataType => {
  return {
    type: "SET_FRIENDS_SEARCH_DATA",
    friendsSearch: friendsSearch,
  };
};

export const changeProfileImageAC = (
  profileImg: string
): changeProfileImageType => {
  return {
    type: "CHANGE_PROFILE_IMAGE",
    profileImg: profileImg,
  };
};

export const changeProfileStatusAC = (
  status: string
): changeProfileStatusType => {
  return {
    type: "CHANGE_PROFILE_STATUS",
    status: status,
  };
};

export const changeProfileRelationshipAC = (
  relationship: string
): changeProfileRelationshipType => {
  return {
    type: "CHANGE_PROFILE_RELATIONSHIP",
    relationship: relationship,
  };
};

export const changeProfileLivesAC = (lives: string): changeProfileLivesType => {
  return {
    type: "CHANGE_PROFILE_LIVES",
    lives: lives,
  };
};

export const changeProfileBirthdayAC = (
  birthday: number
): changeProfileBirthdayType => {
  return {
    type: "CHANGE_PROFILE_BIRTHDAY",
    birthday: birthday,
  };
};

export const logoutAC = (): destroySessionType => {
  return {
    type: "DESTROY_SESSION",
  };
};

export const startLoadProfileAC = (): startLoadProfileType => {
  return {
    type: "START_LOAD_PROFILE",
  };
};

export const endLoadProfileAC = (): endLoadProfileType => {
  return {
    type: "PROFILE_LOADED",
  };
};

export const setPostsAC = (posts: Post[]): setPostsType => {
  return { type: SET_POSTS, posts };
};
export const addPostAC = (
  postId: string,
  userId: string,
  firstName: string,
  lastName: string,
  profileImage: string
): addPostType => {
  return {
    type: ADD_NEW_POST,
    postId,
    userId,
    firstName,
    lastName,
    profileImage,
  };
};
export const deletePostAC = (postId: string): deletePostType => {
  return { type: DELETE_POST, postId };
};

export const startEditPostModeAC = (postId: string): startEditPostModeType => {
  return { type: START_EDIT_MODE_POST, postId };
};
export const cancelEditPostModeAC = (
  postId: string
): cancelEditPostModeType => {
  return { type: CANCEL_EDIT_MODE_POST, postId };
};
export const endEditPostModeAC = (
  postId: string,
  text: string,
  imgURL: string
): endEditPostModeType => {
  return { type: END_EDIT_MODE_POST, postId, text, imgURL };
};

export const changePostInputAC = (text: string): changePostInputType => {
  return { type: CHANGE_POST_INPUT, text };
};

export const addEmojiInputAC = (emoji: string): addEmojiInputType => {
  return { type: ADD_EMOJI_INPUT, emoji };
};
export const likePostAC = (postId: string): likePostType => {
  return { type: LIKE_POST, postId };
};
export const unlikePostAC = (postId: string): unlikePostType => {
  return { type: UNLIKE_POST, postId };
};

export const addCommentAC = (
  postId: string,
  comment: string,
  date: number,
  commentId: string,
  userId: string,
  userFirstName: string,
  userLastName: string,
  profileImage: string
): addCommentType => {
  const userComment: userComment = {
    _id: userId,
    profileImage,
    userFirstName,
    userLastName,
  };
  return { type: ADD_COMMENT, postId, comment, date, commentId, userComment };
};

export const deleteCommentAC = (
  postId: string,
  commentId: string
): deleteCommentType => {
  return { type: DELETE_COMMENT, postId, commentId };
};

export const addPostImageAC = (
  image: string,
  imageFile: File
): addPostImageType => {
  return { type: ADD_POST_IMAGE, image, imageFile };
};

export const refreshTokenAC = (accessToken: string): refreshTokenType => {
  return { type: REFRESH_TOKEN, accessToken };
};

export const authorizationAC = (
  id: string,
  firstName: string,
  lastName: string,
  birthday: number,
  gender: string,
  accessToken: string,
  profileImage?: string
): authorizationType => {
  return {
    type: AUTHORIZATION,
    id,
    firstName,
    lastName,
    birthday,
    gender,
    accessToken,
    profileImage,
  };
};

export const initializeAC = (): initializeType => {
  return {
    type: INITIALIZE,
  };
};

export const setProfileDataAC = (
  isOwnProfile: boolean,
  _id: string,
  firstName: string,
  lastName: string,
  profileImg: string,
  lives: string,
  status: string,
  birthDay: number,
  relationship: string,
  posts: Post[],
  isFriend: boolean,
  isRequestSent: boolean
): setProfileDataType => {
  return {
    type: SET_PROFILE_DATA,
    isOwnProfile,
    _id,
    firstName,
    lastName,
    profileImg,
    status,
    birthDay,
    relationship,
    lives,
    posts,
    isFriend,
    isRequestSent,
  };
};

export const startLoadChatAC = (): startLoadChatType => {
  return {
    type: "START_LOAD_CHAT",
  };
};

export const endLoadChatAC = (): endLoadChatType => {
  return {
    type: "CHAT_LOADED",
  };
};

export const startLoadMessengerAC = (): startLoadMessengerType => {
  return {
    type: "START_LOAD_MESSENGER",
  };
};

export const endLoadMessengerAC = (): endLoadMessengerType => {
  return {
    type: "MESSENGER_LOADED",
  };
};
export const setMessengerDataAC = (
  messengers: MessengerItem[]
): setMessengerDataType => {
  return {
    type: "SET_MESSENGER_DATA",
    messengers: messengers,
  };
};

export const setChatDataAC = (
  conversationId: string,
  firstName: string,
  lastName: string,
  profileImg: string,
  messages: Message[],
  companionId: string
): setChatDataType => {
  return {
    type: SET_CHAT_DATA,
    companionId,
    conversationId,
    firstName,
    lastName,
    profileImg,
    messages,
  };
};

export const addMessageAC = (
  conversationId: string,
  text: string,
  messageId: string,
  isSender: boolean
): addMessageChatType => {
  return {
    type: ADD_MESSAGE,
    conversationId,
    text,
    messageId,
    isSender,
  };
};
