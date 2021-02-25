import { actionsTypes } from "./actionTypes";

export const AUTHORIZATION = "AUTHORIZATION";
export const INITIALIZE = "INITIALIZE";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";

export interface initialStateType {
  isInitialized: boolean;
  isAuth: boolean;
  id: string;
  firstName: string;
  lastName: string;
  birthday: number;
  gender: string;
  accessToken: string;
  profileImage: string;
}

let initialState: initialStateType = {
  isInitialized: false,
  isAuth: false,
  id: "",
  firstName: "",
  lastName: "",
  birthday: -1,
  gender: "",
  accessToken: "",
  profileImage: "",
};

export function authReducer(
  oldAppState: initialStateType = initialState,
  action: actionsTypes
): initialStateType {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...oldAppState,
        isAuth: true,
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        birthday: action.birthday,
        gender: action.gender,
        accessToken: action.accessToken,
        profileImage: action.profileImage,
      };
    case REFRESH_TOKEN:
      return {
        ...oldAppState,
        accessToken: action.accessToken,
      };
    case INITIALIZE:
      return {
        ...oldAppState,
        isInitialized: true,
      };

    case CHANGE_PROFILE_IMAGE:
      return {
        ...oldAppState,
        profileImage: action.profileImg,
      };

    case "DESTROY_SESSION":
      return {
        ...oldAppState,
        isInitialized: true,
      };

    default:
      return oldAppState;
  }
}
