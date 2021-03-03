import React from "react";
import { Route } from "react-router";

import FriendsPage from "../pages/FriendsPage";
import MessagesPage from "../pages/MessagesPage";
import PhotosPage from "../pages/PhotosPage/PhotosPage";
import ProfilePageContainer from "../../../components/App/Main/Content/ProfilePage/ProfilePageContainer";
import ChatPage from "../pages/ChatPage/ChatPage";
import s from "./Content.module.css";
import MainPageContainer from "../../../components/App/Main/Content/MainPage/MainPageContainer";

function Content() {
  return (
    <div className={s.content}>
      <Route path="/main" render={() => <MainPageContainer />} />
      <Route path="/profile" render={() => <ProfilePageContainer />} />
      <Route path="/messages" render={() => <MessagesPage />} />
      <Route path="/chat" render={() => <ChatPage />} />
      <Route path="/friends" render={() => <FriendsPage />} />
      <Route path="/photos" render={() => <PhotosPage />} />
    </div>
  );
}

export default Content;
