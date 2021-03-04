import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import s from "./FriendsSearch.module.css";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Dispatch } from "react";
import {
  actionsTypes,
  changeFilterValueAC,
  setFriendsSearchDataAC,
} from "../../../../redux/actionTypes";
import { FriendsRequests } from "../../../../API/FriendsRequests";

interface OwnProps {
  newFriendsPage: boolean;
}

interface PropsFromState {
  filter: string;
}

interface PropsFromDispatch {
  onChangeFilter(value: string): Promise<void>;
  onNewFriendsSearch(value: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function FriendsSearch(props: AllProps) {
  return (
    <div className={s.friendsSearch}>
      <div className={s.searchIcon}>
        <SearchIcon style={{ color: "#95A5BD" }} />
      </div>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Search"
          value={props.filter}
          onChange={(e) =>
            props.newFriendsPage
              ? props.onNewFriendsSearch(e.target.value)
              : props.onChangeFilter(e.target.value)
          }
        />
      </div>
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    filter: state.friendsData.filter,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
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

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(FriendsSearch);
