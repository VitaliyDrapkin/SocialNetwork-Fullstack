import { Friend } from "./../models/friend";
import { actionsTypes } from "./actionTypes";

export const START_LOAD_FRIENDS = "START_LOAD_FRIENDS";
export const FRIENDS_PAGE_LOADED = "FRIENDS_PAGE_LOADED";
export const SET_FRIENDS_DATA = "SET_FRIENDS_DATA";
export const SET_FRIENDS_SEARCH_DATA = "SET_FRIENDS_SEARCH_DATA";
export const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE";
export const DELETE_FRIEND = "DELETE_FRIEND";

export interface initialStateType {
  isLoaded: boolean;
  friends: Friend[];
  requestsSent: Friend[];
  requestsReceived: Friend[];
  friendsSearch: Friend[];
  filter: string;
}

let initialState: initialStateType = {
  isLoaded: false,
  friends: [],
  requestsSent: [],
  requestsReceived: [],
  friendsSearch: [],
  filter: "",
};

export function friendsReducer(
  oldAppState: initialStateType = initialState,
  action: actionsTypes
): initialStateType {
  switch (action.type) {
    case START_LOAD_FRIENDS:
      return {
        ...oldAppState,
        isLoaded: false,
        filter: "",
      };
    case FRIENDS_PAGE_LOADED:
      return {
        ...oldAppState,
        isLoaded: true,
      };
    case SET_FRIENDS_DATA:
      return {
        ...oldAppState,
        friends: action.friends,
        requestsSent: action.requestsSent,
        requestsReceived: action.requestsReceived,
      };
    case CHANGE_FILTER_VALUE:
      return {
        ...oldAppState,
        filter: action.filter,
      };
    case SET_FRIENDS_SEARCH_DATA:
      return {
        ...oldAppState,
        friendsSearch: action.friendsSearch,
      };
    case DELETE_FRIEND:
      return {
        ...oldAppState,
        friends: [
          ...oldAppState.friends.filter(
            (friend) => friend._id !== action.friendId
          ),
        ],
      };

    default:
      return oldAppState;
  }
}
