import React from "react";
import s from "./MenuHeader.module.css";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";

interface styledMenuProps {
  id: string;
  anchorEl: Element;
  keepMounted: boolean;
  open: boolean;
  onClose: () => void;
}
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    display: "flex",
    flexDirection: "column",
  },
})((props: styledMenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 55,
      horizontal: 85,
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

interface MenuHeaderProps {
  userId: string;
  profileImg: string;
  userFirstName: string;
  userLastName: string;
  onCLose(): void;
  anchorEl: Element;
  onClickLogout(): Promise<void>;
}
export default function MenuHeader(props: MenuHeaderProps) {
  const handleClose = () => {
    props.onCLose();
  };

  return (
    <div className={s.menu}>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={handleClose}
      >
        <NavLink
          to={`/profile/${props.userId}`}
          style={{ textDecoration: "none", margin: 0, outline: "none" }}
          onClick={props.onCLose}
        >
          <div className={s.profile}>
            <div className={s.avatar}>
              <Avatar src={props.profileImg} />
            </div>
            <div className={s.name}>
              {props.userFirstName} {props.userLastName}
            </div>
          </div>
        </NavLink>
        <div className={s.more}>
          <div className={s.setting}>
            <SettingsIcon />
            <span>Settings</span>
          </div>
          <div className={s.help}>
            <HelpIcon />
            <span>Help</span>
          </div>
        </div>
        <div className={s.logout} onClick={props.onClickLogout}>
          <ExitToAppIcon />
          <span>logout</span>
        </div>
      </StyledMenu>
    </div>
  );
}
