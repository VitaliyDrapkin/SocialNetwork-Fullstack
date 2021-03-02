import React, { useEffect, useState } from "react";
import s from "./FriendsPage.module.css";
import FriendItem from "./FriendItem/FriendItem";
import { Friend } from "../../../../../models/friend";
import FriendsSearch from "./FriendsSearch/FriendsSearch";
import FriendsSearchContainer from "./FriendsSearch/FriendsSearchContainer";

interface FriendsPageProps {
  friends: Friend[];
  requestsSent: Friend[];
  requestsReceived: Friend[];
  friendsSearch: Friend[];
  filter: string;
  onClickSearchFriends(value: string): Promise<void>;
  deleteFriend(friendId: string): Promise<void>;
  loadFriendsPage(): void;
  filterOwnFriends(friends: Friend[], filter: string): Friend[];
}
function FriendsPage(props: FriendsPageProps) {
  const [newFriendsPage, setNewFriendsPage] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    props.loadFriendsPage();
  }, []); //Only if first load
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
      {!showRequests && (
        <FriendsSearchContainer newFriendsPage={newFriendsPage} />
      )}
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

export default FriendsPage;
