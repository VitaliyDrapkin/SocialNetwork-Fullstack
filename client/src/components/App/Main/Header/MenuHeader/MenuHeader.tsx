import React from "react";
import s from "./MenuHeader.module.css";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    display: "flex",
    flexDirection: "column",
  },
})((props: any) => (
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

export default function MenuHeader(props: any) {
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
        <div className={s.profile}>
          <div className={s.avatar}>
            <Avatar src={props.profileImg} />
          </div>
          <div className={s.name}>
            {props.userFirstName} {props.userLastName}
          </div>
        </div>
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
