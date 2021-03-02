import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import s from "./App.module.css";

import Main from "./components/App/Main/Main";
import LoginPageContainer from "./components/App/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./components/App/RegisterPage/RegisterPageContainer";
import RestorePageContainer from "./components/App/RestorePage/RestorePageContainer";
import { withUnauthorizedRedirect } from "./components/Helpers/hoc/withUnauthorizedRedirect";
import { withAuthorizedRedirect } from "./components/Helpers/hoc/withAuthorizedRedirect";

interface AppPropsType {
  isInitialized: Boolean;
  initialize(): void;
}

function App(props: AppPropsType) {
  useEffect(() => {
    props.initialize();
  }, []); //Only if first load

  return (
    <BrowserRouter>
      <div className={s.app}>
        {props.isInitialized ? (
          <Switch>
            <Redirect from="/" to="/main" exact />
            <Route
              path={["/main", "/profile", "/friends", "/messages", "/chat"]}
              component={withUnauthorizedRedirect(Main)}
            />

            <Route
              path="/login"
              component={withAuthorizedRedirect(LoginPageContainer)}
            />
            <Route
              path="/registration"
              component={withAuthorizedRedirect(RegisterPageContainer)}
            />
            <Route
              path="/restore"
              component={withAuthorizedRedirect(RestorePageContainer)}
            />
            {/* <Route component={LoginPageContainer} /> */}
          </Switch>
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
