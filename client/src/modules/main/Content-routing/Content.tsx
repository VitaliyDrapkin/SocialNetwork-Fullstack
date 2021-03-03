import React from "react";
import { Route } from "react-router";

import FriendsPage from "../pages/FriendsPage";
import MessagesPage from "../pages/MessagesPage";
import PhotosPage from "../pages/PhotosPage/PhotosPage";
import ProfilePage from "../pages/ProfilePage";
import ChatPage from "../pages/ChatPage/ChatPage";
import s from "./Content.module.css";
import MainPage from "../pages/MainPage";

function Content() {
  return (
    <div className={s.content}>
      <Route path="/main" render={() => <MainPage />} />
      <Route path="/profile" render={() => <ProfilePage />} />
      <Route path="/messages" render={() => <MessagesPage />} />
      <Route path="/chat" render={() => <ChatPage />} />
      <Route path="/friends" render={() => <FriendsPage />} />
      <Route path="/photos" render={() => <PhotosPage />} />
    </div>
  );
}

export default Content;
