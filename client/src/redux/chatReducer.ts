import { MessengerItem } from "./../models/message";
import { Message } from "../models/message";
import { actionsTypes } from "./actionTypes";

export const START_LOAD_CHAT = "START_LOAD_CHAT";
export const START_LOAD_MESSENGER = "START_LOAD_MESSENGER";
export const CHAT_LOADED = "CHAT_LOADED";
export const MESSENGER_LOADED = "MESSENGER_LOADED";
export const SET_CHAT_DATA = "SET_CHAT_DATA";
export const SET_MESSENGER_DATA = "SET_MESSENGER_DATA";
export const ADD_MESSAGE = "ADD_MESSAGE";

export interface initialStateType {
  companionId: string;
  isChatLoaded: boolean;
  isMessengerLoaded: boolean;
  conversationId: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  messages: Message[];
  messengers: MessengerItem[];
}

let initialState: initialStateType = {
  companionId: "",
  isChatLoaded: false,
  isMessengerLoaded: false,
  conversationId: "",
  firstName: "",
  lastName: "",
  profileImg: "",
  messages: [],
  messengers: [],
};

export function chatReducer(
  oldAppState: initialStateType = initialState,
  action: actionsTypes
): initialStateType {
  switch (action.type) {
    case START_LOAD_CHAT:
      return {
        ...oldAppState,
        isChatLoaded: false,
      };
    case START_LOAD_MESSENGER:
      return {
        ...oldAppState,
        isMessengerLoaded: false,
      };
    case CHAT_LOADED:
      return {
        ...oldAppState,
        isChatLoaded: true,
      };
    case MESSENGER_LOADED:
      return {
        ...oldAppState,
        isMessengerLoaded: true,
      };
    case SET_CHAT_DATA:
      return {
        ...oldAppState,
        companionId: action.companionId,
        conversationId: action.conversationId,
        firstName: action.firstName,
        lastName: action.lastName,
        profileImg: action.profileImg,
        messages: action.messages,
      };
    case SET_MESSENGER_DATA:
      return {
        ...oldAppState,
        messengers: action.messengers,
      };
    case ADD_MESSAGE:
      const newMessage = new Message(
        action.messageId,
        action.text,
        action.isSender
      );

      return {
        ...oldAppState,
        messages: [newMessage, ...oldAppState.messages],
      };

    default:
      return oldAppState;
  }
}
