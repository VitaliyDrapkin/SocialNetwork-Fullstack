import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import s from "./App.module.css";

import Main from "./modules/main/Main";
import RestorePage from "./modules/restorePass/RestorePage";
import LoginPage from "./modules/login/LoginPage";
import RegisterPage from "./modules/register/registerPage";

interface AppPropsType {
  isInitialized: Boolean;
  initialize(): void;
}

function App(props: AppPropsType) {
  useEffect(() => {
    let init = props.initialize;
    init();
  }, [props.initialize]);

  return (
    <BrowserRouter>
      <div className={s.app}>
        {props.isInitialized ? (
          <Switch>
            <Redirect from="/" to="/main" exact />
            <Route
              path={["/main", "/profile", "/friends", "/messages", "/chat"]}
              component={Main}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegisterPage} />
            <Route path="/restore" component={RestorePage} />
          </Switch>
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
