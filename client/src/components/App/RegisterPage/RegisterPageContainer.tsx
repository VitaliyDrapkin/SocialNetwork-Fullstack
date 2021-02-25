import { connect } from "react-redux";
import { Dispatch } from "redux";
import { UsersRequests } from "../../../API/UsersRequests";
import { actionsTypes, authorizationAC } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import RegisterPage from "./RegisterPage";

interface mapDispatchToPropsType {
  onRegistration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: number,
    gender: string
  ): void;
}

const mapStateToProps = (state: RootState): {} => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onRegistration: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      birthday: number,
      gender: string
    ) => {
      const responseData = await UsersRequests.registration(
        firstName,
        lastName,
        email,
        password,
        new Date(birthday).getTime(),
        gender
      );
      dispatch(
        authorizationAC(
          responseData._id,
          firstName,
          lastName,
          new Date(birthday).getTime(),
          gender,
          responseData.accessToken
        )
      );
    },
  };
};
const RegisterPageContainer = connect<
  {},
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export default RegisterPageContainer;
