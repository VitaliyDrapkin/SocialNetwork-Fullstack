import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionsTypes } from "../../../redux/actionTypes";
import { RootState } from "../../../redux/store";
import RestorePage from "./RestorePage";

interface mapDispatchToPropsType {
  onRestorePassword(email: string): void;
}

const mapStateToProps = (state: RootState): {} => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onRestorePassword: async (email: string) => {
      alert(email);
    },
  };
};

const RestorePageContainer = connect<{}, mapDispatchToPropsType, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(RestorePage);

export default RestorePageContainer;
