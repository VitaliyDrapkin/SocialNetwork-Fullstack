import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { addSocketEvents } from "../../socketIo/main";
import s from "./Main.module.css";
import Content from "./Content-routing";
import { withUnauthorizedRedirect } from "../../hocs/withUnauthorizedRedirect";

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

export default  withUnauthorizedRedirect(Main);
