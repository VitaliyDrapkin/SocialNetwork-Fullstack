import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import s from "./App.module.css";

import Main from "./components/App/Main/Main";
import RegisterPageContainer from "./modules/register/registerPage/RegisterPageContainer";
import RestorePageContainer from "./components/App/RestorePage/RestorePageContainer";
import { withUnauthorizedRedirect } from "./components/Helpers/hoc/withUnauthorizedRedirect";
import { withAuthorizedRedirect } from "./components/Helpers/hoc/withAuthorizedRedirect";
import LoginPage from "./modules/login/LoginPage";

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
            <Route path="/login" component={LoginPage} />
            <Route
              path="/registration"
              component={withAuthorizedRedirect(RegisterPageContainer)}
            />
            <Route
              path="/restore"
              component={withAuthorizedRedirect(RestorePageContainer)}
            />
          </Switch>
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
