import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionsTypes } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import SideBar from "./SideBar";

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
const SideBarContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);

export default SideBarContainer;
