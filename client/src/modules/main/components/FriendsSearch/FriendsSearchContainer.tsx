import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Dispatch } from "react";
import FriendsSearch from "./FriendsSearch";
import {
  actionsTypes,
  changeFilterValueAC,
  setFriendsSearchDataAC,
} from "../../../../redux/actionTypes";
import { FriendsRequests } from "../../../../API/FriendsRequests";

interface mapStateToPropsType {
  filter: string;
}

interface mapDispatchToPropsType {
  onChangeFilter(value: string): Promise<void>;
  onNewFriendsSearch(value: string): Promise<void>;
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    filter: state.friendsData.filter,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    onChangeFilter: async (value: string) => {
      dispatch(changeFilterValueAC(value));
    },
    onNewFriendsSearch: async (value: string) => {
      dispatch(changeFilterValueAC(value));
      const friends = await FriendsRequests.getNewFriends(value);
      dispatch(setFriendsSearchDataAC(friends));
    },
  };
};

const FriendsSearchContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(FriendsSearch);
export default FriendsSearchContainer;
