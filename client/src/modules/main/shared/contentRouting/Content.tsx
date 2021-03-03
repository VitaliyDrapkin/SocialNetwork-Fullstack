import React from "react";
import { Route } from "react-router";

import FriendsPageContainer from "../../../../components/App/Main/Content/FriendsPage/FriendsPageContainer";
import MainPageContainer from "../../../../components/App/Main/Content/MessagesPage/MessagesPageContainer";
import MessagesPageContainer from "../../../../components/App/Main/Content/MessagesPage/MessagesPageContainer";
import PhotosPage from "../../../../components/App/Main/Content/PhotosPage/PhotosPage";
import ProfilePageContainer from "../../../../components/App/Main/Content/ProfilePage/ProfilePageContainer";
import ChatPage from "../../pages/ChatPage/ChatPage";
import s from "./Content.module.css";

function Content() {
  return (
    <div className={s.content}>
      <Route path="/main" render={() => <MainPageContainer />} />
      <Route path="/profile" render={() => <ProfilePageContainer />} />
      <Route path="/messages" render={() => <MessagesPageContainer />} />
      <Route path="/chat" render={() => <ChatPage />} />
      <Route path="/friends" render={() => <FriendsPageContainer />} />
      <Route path="/photos" render={() => <PhotosPage />} />
    </div>
  );
}

export default Content;
