import React, { MouseEvent } from "react";
import s from "./Header.module.css";
import logo from "../../../assets/images/vkIcon.svg";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../API/UsersRequests";
import { actionsTypes, logoutAC } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import { socketRequests } from "../../../socketIo/main";

interface OwnProps {
  userId: string;
  userFirstName: string;
  userLastName: string;
  profileImg: string;
  onClickLogout(): Promise<void>;
}

interface PropsFromState {
  userId: string;
  userFirstName: string;
  userLastName: string;
  profileImg: string;
}
interface PropsFromDispatch {
  onClickLogout(): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function Header(props: AllProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={s.header}>
      <div className={s.headerLeft}>
        <img src={logo} alt="" />
      </div>
      <div className={s.headerMiddle}>
        <div className={s.headerSearch}>
          <div className={s.searchIcon}>
            <SearchIcon style={{ color: "#86A1BF" }} />
          </div>
          <input type="text" placeholder="Search" />
        </div>
        <div className={s.notifications}>
          <NotificationsIcon fontSize="large" style={{ color: "white" }} />
          <div className={s.countNotifications}>12</div>
        </div>
        <div className={s.chats}>
          <ChatIcon fontSize="large" style={{ color: "#fff" }} />
          <div className={s.countNotifications}>12</div>
        </div>
      </div>
      <div className={s.headerRight}>
        <div className={s.profile} onClick={handleClick}>
          <span>
            {props.userFirstName} {props.userLastName}
          </span>
          <div className={s.avatar}>
            <Avatar src={props.profileImg} />
          </div>
          <ExpandMoreIcon style={{ color: "#9BB3CF" }} />
        </div>
      </div>
      <MenuHeader
        anchorEl={anchorEl}
        onCLose={() => setAnchorEl(null)}
        {...props}
      />
    </div>
  );
}

const mapStateToProps = (state: RootState): PropsFromState => {
  return {
    userId: state.authData.id,
    userFirstName: state.authData.firstName,
    userLastName: state.authData.lastName,
    profileImg: state.authData.profileImage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    onClickLogout: async () => {
      try {
        UsersRequests.logout();
        socketRequests.endSocket();
        dispatch(logoutAC());
      } catch (error) {
        alert("server error logout");
      }
    },
  };
};
export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
