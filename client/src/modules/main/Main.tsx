import React, { Component } from "react";
import Header from "./shared/header";
import SideBar from "./shared/sideBar";
import { addSocketEvents } from "../../socketIo/main";
import s from "./Main.module.css";
import Content from "./shared/contentRouting";

export class Main extends Component {
  componentDidMount() {
    addSocketEvents();
  }

  render() {
    return (
      <div className={s.main}>
        <Header />
        <div className={s.body}>
          <SideBar />
          <Content />
        </div>
      </div>
    );
  }
}

export default Main;
