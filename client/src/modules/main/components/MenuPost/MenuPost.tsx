import React from "react";
import s from "./MenuPost.module.css";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { actionsTypes } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import { Dispatch } from "react";
import { startEditPostModeAC } from "../../../../redux/actionTypes";

interface OwnProps {
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
})((props: OwnProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 40,
      horizontal: -40,
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

interface CustomizedMenusProps {
  postId: string;
  onCLose(): void;
  onDelete(): void;
  anchorEl: Element;
  startEditPost(postId: string): void;
}

function CustomizedMenus(props: CustomizedMenusProps) {
  const handleClose = () => {
    props.onCLose();
  };
  const onClickDelete = () => {
    props.onCLose();
    props.onDelete();
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
        <div className={s.main}>
          <div
            className={s.edit}
            onClick={() => props.startEditPost(props.postId)}
          >
            <EditIcon />
            <span>Edit post</span>
          </div>
          <div className={s.delete} onClick={onClickDelete}>
            <DeleteIcon />
            <span>Delete post</span>
          </div>
        </div>
      </StyledMenu>
    </div>
  );
}

let mapStateToProps = (state: RootState) => {
  return {};
};

let mapDispatchToProps = (dispatch: Dispatch<actionsTypes>) => {
  return {
    startEditPost: (postId: string) => {
      dispatch(startEditPostModeAC(postId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedMenus);
