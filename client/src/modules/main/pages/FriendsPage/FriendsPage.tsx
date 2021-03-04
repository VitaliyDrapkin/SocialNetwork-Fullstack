import React, { useEffect, useState } from "react";
import FriendItem from "../../components/FriendItem/";
import FriendsSearch from "../../components/FriendsSearch";
import s from "./FriendsPage.module.css";
import { Dispatch } from "react";
import { connect } from "react-redux";
import { FriendsRequests } from "../../../../API/FriendsRequests";
import { Friend } from "../../../../models/friend";
import {
  actionsTypes,
  deleteFriendAC,
  endLoadMyFriendsAC,
  setFriendsDataAC,
  setFriendsSearchDataAC,
  startLoadMyFriendsAC,
} from "../../../../redux/actionTypes";
import { RootState } from "../../../../redux/store";

interface OwnProps {}

interface PropsFromState {
  friends: Friend[];
  requestsSent: Friend[];
  requestsReceived: Friend[];
  filter: string;
  friendsSearch: Friend[];
}

interface PropsFromDispatch {
  loadFriendsPage(): Promise<void>;
  filterOwnFriends(friends: Friend[], filter: string): Friend[];
  onClickSearchFriends(value: string): Promise<void>;
  deleteFriend(friendId: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function FriendsPage(props: AllProps) {
  const [newFriendsPage, setNewFriendsPage] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    let pageLoad = props.loadFriendsPage;
    pageLoad()
  }, [props.loadFriendsPage]); 

  return (
    <div className={s.friendsPage}>
      <div className={s.friendsTop}>
        {newFriendsPage ? (
          <div className={s.addFriends}>Add friends</div>
        ) : (
          <div className={s.friendsStatistic}>
            <div
              className={showRequests ? s.onlineFriends : s.allFriends}
              onClick={() => setShowRequests(false)}
            >
              Friends : <span>{props.friends.length}</span>
            </div>
            <div
              className={showRequests ? s.allFriends : s.onlineFriends}
              onClick={() => setShowRequests(true)}
            >
              Requests : <span>{props.requestsReceived.length}</span>
            </div>
          </div>
        )}
        {newFriendsPage ? (
          <div
            className={s.addFriendsBTN}
            onClick={() => {
              setNewFriendsPage(false);
            }}
          >
            <button>My friends</button>
          </div>
        ) : (
          <div
            className={s.addFriendsBTN}
            onClick={() => {
              setNewFriendsPage(true);
              props.onClickSearchFriends(props.filter);
            }}
          >
            <button>Add friends</button>
          </div>
        )}
      </div>
      {!showRequests && <FriendsSearch newFriendsPage={newFriendsPage} />}
      {newFriendsPage ? (
        <div className={s.friendsMain}>
          {props.friendsSearch.map((friend) => (
            <FriendItem type="myFriends" friend={friend} />
          ))}
        </div>
      ) : showRequests ? (
        <div>
          <div className={s.requestsHeadline}>Friends requests</div>
          <div className={s.friendsMain}>
            {props.requestsReceived.map((friend) => (
              <FriendItem type="receivedRequests" friend={friend} />
            ))}
          </div>
          <div className={s.requestsHeadline}>Sent requests</div>

          <div className={s.friendsMain}>
            {props.requestsSent.map((friend) => (
              <FriendItem type="sentRequests" friend={friend} />
            ))}
          </div>
        </div>
      ) : (
        <div className={s.friendsMain}>
          {props.filterOwnFriends(props.friends, props.filter).map((friend) => (
            <FriendItem
              type="search"
              friend={friend}
              deleteFriend={props.deleteFriend}
            />
          ))}
        </div>
      )}
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
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
): PropsFromDispatch => {
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

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(FriendsPage);
