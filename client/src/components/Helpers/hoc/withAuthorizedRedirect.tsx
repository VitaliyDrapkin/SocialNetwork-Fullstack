import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";

interface mapStateToPropsType {
  isAuth: Boolean;
}

let mapStateToPropsForRedirect = (state: RootState) => ({
  isAuth: state.authData.isAuth,
});

export const withAuthorizedRedirect = (Component: ComponentType) => {
  const RedirectComponent: React.FC<mapStateToPropsType> = (props) => {
    if (!props.isAuth) {
      return <Component {...props} />;
    }
    return <Redirect to="/Main" />;
  };

  let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectAuthRedirectComponent;
};
