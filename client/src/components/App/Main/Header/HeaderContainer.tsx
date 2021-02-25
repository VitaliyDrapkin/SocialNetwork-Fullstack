import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../../API/UsersRequests";
import { actionsTypes, logoutAC } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import Header from "./Header";

interface mapStateToPropsType {
  userFirstName: string;
  userLastName: string;
  profileImg: string;
}
interface mapDispatchToPropsType {
  onClickLogout(): Promise<void>;
}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    userFirstName: state.authData.firstName,
    userLastName: state.authData.lastName,
    profileImg: state.authData.profileImage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onClickLogout: async () => {
      try {
        UsersRequests.logout();
        dispatch(logoutAC());
      } catch (error) {
        alert("server error logout");
      }
    },
  };
};
const HeaderContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
