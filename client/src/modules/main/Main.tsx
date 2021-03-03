import React, { Component } from "react";
import Content from "../../components/App/Main/Content/Content";
import HeaderContainer from "./shared/header";
import SideBarContainer from "../../components/App/Main/SideBar/SideBarContainer";
import { addSocketEvents } from "../../socketIo/main";
import s from "./Main.module.css";

export class Main extends Component {
  componentDidMount() {
    addSocketEvents();
  }

  render() {
    return (
      <div className={s.main}>
        <HeaderContainer />
        <div className={s.body}>
          <SideBarContainer />
          <Content />
        </div>
      </div>
    );
  }
}

export default Main;
