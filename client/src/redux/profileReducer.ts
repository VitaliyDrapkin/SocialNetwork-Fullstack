import { actionsTypes } from "./actionTypes";

export const START_LOAD_PROFILE = "START_LOAD_PROFILE";
export const PROFILE_LOADED = "PROFILE_LOADED";
export const SET_PROFILE_DATA = "SET_PROFILE_DATA";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const CHANGE_PROFILE_STATUS = "CHANGE_PROFILE_STATUS";
export const CHANGE_PROFILE_LIVES = "CHANGE_PROFILE_LIVES";
export const CHANGE_PROFILE_BIRTHDAY = "CHANGE_PROFILE_BIRTHDAY";
export const CHANGE_PROFILE_RELATIONSHIP = "CHANGE_PROFILE_RELATIONSHIP";

export interface initialStateType {
  isLoaded: boolean;
  _id: string;
  isOwnProfile: boolean;
  firstName: string;
  lastName: string;
  profileImg: string;
  status: string;
  birthDay: number;
  relationship: string;
  relationshipUser?: { _id: number; firstName: string; lastName: string };
  lives: string;
  photo?: string[];
  photoCount?: number;
  isFriend: boolean;
  isRequestSent: boolean;
}

let initialState: initialStateType = {
  isLoaded: false,
  _id: "",
  isOwnProfile: false,
  firstName: "",
  lastName: "",
  profileImg: "",
  status: "",
  birthDay: null,
  relationship: "",
  relationshipUser: null,
  lives: "",
  photo: [],
  photoCount: 0,
  isFriend: false,
  isRequestSent: false,
};

export function profileReducer(
  oldAppState: initialStateType = initialState,
  action: actionsTypes
): initialStateType {
  switch (action.type) {
    case START_LOAD_PROFILE:
      return {
        ...oldAppState,
        isLoaded: false,
      };
    case PROFILE_LOADED:
      return {
        ...oldAppState,
        isLoaded: true,
      };

    case SET_PROFILE_DATA:
      return {
        ...oldAppState,
        isOwnProfile: action.isOwnProfile,
        _id: action._id,
        firstName: action.firstName,
        lastName: action.lastName,
        status: action.status,
        birthDay: action.birthDay,
        lives: action.lives,
        relationship: action.relationship,
        profileImg: action.profileImg,
        isFriend: action.isFriend,
        isRequestSent: action.isRequestSent,
      };

    case CHANGE_PROFILE_IMAGE:
      return {
        ...oldAppState,
        profileImg: action.profileImg,
      };

    case CHANGE_PROFILE_STATUS:
      return {
        ...oldAppState,
        status: action.status,
      };
    case CHANGE_PROFILE_LIVES:
      return {
        ...oldAppState,
        lives: action.lives,
      };
    case CHANGE_PROFILE_BIRTHDAY:
      return {
        ...oldAppState,
        birthDay: action.birthday,
      };
    case CHANGE_PROFILE_RELATIONSHIP:
      return {
        ...oldAppState,
        relationship: action.relationship,
      };
    default:
      return oldAppState;
  }
}
