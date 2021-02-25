import { connect } from "react-redux";
import { PostsRequests } from "../../../../../API/PostsRequests";
import {
  actionsTypes,
  deleteFriendAC,
  endLoadMyFriendsAC,
  setFriendsDataAC,
  setFriendsSearchDataAC,
  setPostsAC,
  startLoadMyFriendsAC,
} from "../../../../../redux/actionTypes";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "react";
import { Friend } from "../../../../../Model/friend";
import FriendsPage from "./FriendsPage";
import { FriendsRequests } from "../../../../../API/FriendsRequests";

interface mapStateToPropsType {
  friends: Friend[];
  requestsSent: Friend[];
  requestsReceived: Friend[];
  filter: string;
  friendsSearch: Friend[];
}

interface mapDispatchToPropsType {
  loadFriendsPage(): Promise<void>;
  filterOwnFriends(friends: Friend[], filter: string): Friend[];
  onClickSearchFriends(value: string): Promise<void>;
  deleteFriend(friendId: string): Promise<void>;
}
let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    friends: state.friendsData.friends,
    requestsSent: state.friendsData.requestsSent,
    requestsReceived: state.friendsData.requestsReceived,
    filter: state.friendsData.filter,
    friendsSearch: state.friendsData.friendsSearch,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
  return {
    loadFriendsPage: async () => {
      const friends = await FriendsRequests.getFriends();
      dispatch(startLoadMyFriendsAC());
      dispatch(
        setFriendsDataAC(
          friends.friends,
          friends.friendsRequestsSent,
          friends.friendsRequestsReceived
        )
      );
      dispatch(endLoadMyFriendsAC());
    },
    onClickSearchFriends: async (value: string) => {
      const friends = await FriendsRequests.getNewFriends(value);
      dispatch(setFriendsSearchDataAC(friends));
    },

    deleteFriend: async (friendId: string) => {
      await FriendsRequests.removeFriend(friendId);
      dispatch(deleteFriendAC(friendId));
    },

    filterOwnFriends: (friends: Friend[], filter: string): Friend[] => {
      const newFriends = friends.filter((friend) => {
        const firstLastName = friend.firstName + " " + friend.lastName;
        return firstLastName
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      });
      return newFriends;
    },
  };
};

const FriendsPageContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(FriendsPage);
export default FriendsPageContainer;
