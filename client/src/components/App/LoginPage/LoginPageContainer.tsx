import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../API/UsersRequests";
import { actionsTypes, authorizationAC } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import { addSocketEvents } from "../../../socketIo/main";
import LoginPage from "./LoginPage";

interface mapDispatchToPropsType {
  onLogin(login: string, password: string): void;
}

const mapStateToProps = (state: RootState): {} => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onLogin: async (email: string, password: string) => {
      addSocketEvents();
      const responseData = await UsersRequests.login(email, password);
      dispatch(
        authorizationAC(
          responseData._id,
          responseData.firstName,
          responseData.lastName,
          responseData.birthday,
          responseData.gender,
          responseData.accessToken,
          responseData.profileImg
        )
      );
    },
  };
};

const LoginFormContainer = connect<{}, mapDispatchToPropsType, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginFormContainer;
