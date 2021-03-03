import React from "react";
import { NavLink } from "react-router-dom";
import s from "./SideBar.module.css";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import MessageIcon from "@material-ui/icons/Message";
import PeopleIcon from "@material-ui/icons/People";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionsTypes } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";

interface OwnProps {
  userProfileImage?: string;
  userId: string;
  profileImg: string;
}

interface PropsFromState {}
interface PropsFromDispatch {}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function SideBar(props: AllProps) {
  return (
    <div className={s.sideBar}>
      <NavLink to="/main" className={s.navigationItem}>
        <HomeIcon fontSize="large" />
        <span>Home page</span>
      </NavLink>
      <NavLink to={`/profile/${props.userId}`} className={s.navigationItem}>
        <Avatar src={props.profileImg} />
        <span>Profile</span>
      </NavLink>
      <NavLink to="/messages" className={s.navigationItem}>
        <MessageIcon fontSize="large" />
        <span>Messages</span>
      </NavLink>
      <NavLink to="/friends" className={s.navigationItem}>
        <PeopleIcon fontSize="large" />
        <span>Friends</span>
      </NavLink>
      {/* <NavLink to="/photos" className={s.navigationItem}>
        <PhotoLibraryIcon fontSize="large" />
        <span>Photo</span>
      </NavLink> */}
    </div>
  );
}

interface mapStateToPropsType {
  userId: string;
  userProfileImage?: string;
  profileImg: string;
}
interface mapDispatchToPropsType {}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    userId: state.authData.id,
    profileImg: state.authData.profileImage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {};
};

export default connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
