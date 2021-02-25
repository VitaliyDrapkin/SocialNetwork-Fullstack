import { connect } from "react-redux";
import MenuPost from "./MenuPost";
import { actionsTypes } from "../../../../../../../redux/actionTypes";
import { RootState } from "../../../../../../../redux/store";
import { Dispatch } from "react";
import { startEditPostModeAC } from "../../../../../../../redux/actionTypes";

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

const MenuPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPost);

export default MenuPostContainer;
