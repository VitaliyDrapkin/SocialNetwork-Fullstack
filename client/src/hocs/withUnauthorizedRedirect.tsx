import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../redux/store";

interface mapStateToPropsType {
  isAuth: Boolean;
}
let mapStateToPropsForRedirect = (state: RootState): mapStateToPropsType => ({
  isAuth: state.authData.isAuth,
});

export function withUnauthorizedRedirect(Component: ComponentType) {
  const RedirectComponent: React.FC<mapStateToPropsType> = (props) => {
    if (props.isAuth) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };

  let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectAuthRedirectComponent;
}
