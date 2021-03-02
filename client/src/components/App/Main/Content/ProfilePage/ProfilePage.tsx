import React, { useEffect, useState } from "react";
import s from "./ProfilePage.module.css";
import AddPostContainer from "../MainPage/AddPost/AddPostContainer";
import noAvatar from "../../../../../assets/images/noAvatar.svg";
import { useLocation } from "react-router";
import LivesContainer from "./Lives/Lives";
import BirthdayContainer from "./Birthday/Birthday";
import RelationshipContainer from "./Relationship/Relationship";
import StatusContainer from "./Status/Status";
import { Post } from "../../../../../Model/post";
import EditPostContainer from "../MainPage/EditPost/EditPostContainer";
import PostItemContainer from "../MainPage/Post/PostItemContainer";
import { NavLink } from "react-router-dom";
import { useRequestFriends } from "../FriendsPage/FriendItem/useRequestFriends";

interface profilePagePropsType {
  ownId: string;
  isLoaded: boolean;
  isOwnProfile: boolean;
  firstName: string;
  lastName: string;
  profileImg: string;
  posts: Post[];
  isFriend: boolean;
  isRequestSent: boolean;
  loadProfile(userId: string, ownId: string): Promise<void>;
  addProfileImage(image: File): Promise<void>;
  deleteFriend(friendId: string): Promise<void>;
  addFriend(friendId: string): Promise<void>;
  cancelRequest(friendId: string): Promise<void>;
}
function ProfilePage(props: profilePagePropsType) {
  const [profileImgHover, setProfileImgHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    props.loadProfile(location.pathname.slice("/profile/".length), props.ownId);
  }, [location.pathname.slice("/profile/".length)]);
  return (
    <div className={s.profilePage}>
      {props.isLoaded ? (
        <>
          <div className={s.profileTop}>
            <div
              className={s.profileImage}
              onMouseEnter={() => setProfileImgHover(true)}
              onMouseLeave={() => setProfileImgHover(false)}
            >
              <img src={props.profileImg || noAvatar} alt="" />
              {profileImgHover && (
                <div>
                  Update photo
                  <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    onChange={(event) =>
                      props.addProfileImage(event.target.files[0])
                    }
                  />
                </div>
              )}
            </div>
            <div className={s.profileInformation}>
              <div className={s.profileName}>
                {props.firstName} {props.lastName}
              </div>
              <StatusContainer />
              <BirthdayContainer />
              <RelationshipContainer />
              <LivesContainer />
              {!props.isOwnProfile && (
                <div className={s.actionsButtons}>
                  {props.isFriend ? (
                    <div
                      className={s.addToFriendsBTN}
                      onClick={() =>
                        props.deleteFriend(
                          location.pathname.slice("/profile/".length)
                        )
                      }
                    >
                      Remove friend
                    </div>
                  ) : props.isRequestSent ? (
                    <div
                      className={s.addToFriendsBTN}
                      onClick={() =>
                        props.cancelRequest(
                          location.pathname.slice("/profile/".length)
                        )
                      }
                    >
                      Cancel request
                    </div>
                  ) : (
                    <div
                      className={s.addToFriendsBTN}
                      onClick={() =>
                        props.addFriend(
                          location.pathname.slice("/profile/".length)
                        )
                      }
                    >
                      Add as friend
                    </div>
                  )}
                  <NavLink
                    to={`/chat/${location.pathname.slice("/profile/".length)}`}
                    className={s.sendMessageBTN}
                    style={{ textDecoration: "none" }}
                  >
                    Send Message
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          {/* <div className={s.photosField}>
            <div className={s.photoHeadline}>
              My photo : <span>40</span>
            </div>
            <div className={s.photos}>
              <div className={s.photo}>
                <img src={props.profileImg || noAvatar} alt="" />
              </div>
              <div className={s.photo}>
                <img src={props.profileImg || noAvatar} alt="" />
              </div>
              <div className={s.photo}>
                <img src={props.profileImg || noAvatar} alt="" />
              </div>
              <div className={s.photo}>
                <img src={props.profileImg || noAvatar} alt="" />
              </div>
            </div>
          </div> */}
          {props.isOwnProfile && <AddPostContainer />}
          <div className={s.posts}>
            {props.posts.map((post) => {
              if (post.editMode) {
                return <EditPostContainer post={post} key={post.id} />;
              }
              return <PostItemContainer post={post} key={post.id} />;
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ProfilePage;
