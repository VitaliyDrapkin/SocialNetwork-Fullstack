import React, { useEffect, Component } from "react";
import Content from "./Content/Content";
import s from "./Main.module.css";
import HeaderContainer from "./Header/HeaderContainer";
import SideBarContainer from "./SideBar/SideBarContainer";
import { addSocketEvents } from "../../../socketIo/main";

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
