import { actionsTypes } from "./actionTypes";
import { createStore, combineReducers } from "redux";
import { postPageReducer } from "./postsReducer";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { friendsReducer } from "./friendsReducer";
import { chatReducer } from "./chatReducer";

const appReducer = combineReducers({
  postsData: postPageReducer,
  authData: authReducer,
  profileData: profileReducer,
  friendsData: friendsReducer,
  chatData: chatReducer,
});

//For logout restart redux
const rootReducer = (state: RootState, action: actionsTypes) => {
  // Clear all data in redux store to initial
  if (action.type === "DESTROY_SESSION") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;

type rootReducerType = typeof rootReducer;
export type AppStateReduxType = ReturnType<rootReducerType>;

export const store = createStore(rootReducer);

// for debbuger
declare global {
  interface Window {
    store: any;
  }
}
window.store = store;
//
