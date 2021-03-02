import { connect } from "react-redux";
import App from "./App";
import { Dispatch } from "react";
import { RootState } from "./redux/store";
import {
  actionsTypes,
  initializeAC,
  authorizationAC,
} from "./redux/actionTypes";
import { UsersRequests } from "./API/UsersRequests";

interface mapStateToPropsType {
  isInitialized: Boolean;
}

interface mapDispatchToPropsType {
  initialize(): void;
}
let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    isInitialized: state.authData.isInitialized,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    initialize: async () => {
      try {
        const responseData = await UsersRequests.autoLogin();
        dispatch(
          authorizationAC(
            responseData._id,
            responseData.firstName,
            responseData.lastName,
            responseData.birthday,
            responseData.gender,
            responseData.accessToken,
            responseData.profileImg
          )
        );
        dispatch(initializeAC());
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(initializeAC());
        } else {
          dispatch(initializeAC());
          alert("server error");
        }
      }
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
