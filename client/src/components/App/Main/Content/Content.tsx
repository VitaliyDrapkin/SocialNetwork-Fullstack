import React from "react";
import { Route } from "react-router";
import ChatPageContainer from "./ChatPage/ChatPageContainer";
import s from "./Content.module.css";
import MessagesPageContainer from "./MessagesPage/MessagesPageContainer";
import ProfilePageContainer from "./ProfilePage/ProfilePageContainer";
import PhotosPage from "./PhotosPage/PhotosPage";
import MainPageContainer from "./MainPage/MainPageContainer";
import FriendsPageContainer from "./FriendsPage/FriendsPageContainer";

function Content() {
  return (
    <div className={s.content}>
      <Route path="/main" render={() => <MainPageContainer />} />
      <Route path="/profile" render={() => <ProfilePageContainer />} />
      <Route path="/messages" render={() => <MessagesPageContainer />} />
      <Route path="/chat" render={() => <ChatPageContainer />} />
      <Route path="/friends" render={() => <FriendsPageContainer />} />
      <Route path="/photos" render={() => <PhotosPage />} />
    </div>
  );
}

export default Content;
