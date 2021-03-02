import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../../API/UsersRequests";
import { actionsTypes, logoutAC } from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";
import { socketRequests } from "../../../../socketIo/main";
import Header from "./Header";

interface mapStateToPropsType {
  userId: string;
  userFirstName: string;
  userLastName: string;
  profileImg: string;
}
interface mapDispatchToPropsType {
  onClickLogout(): Promise<void>;
}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    userId: state.authData.id,
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
        socketRequests.endSocket();
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
