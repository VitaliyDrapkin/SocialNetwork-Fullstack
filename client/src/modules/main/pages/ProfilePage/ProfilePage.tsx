import React, { useEffect, useState, Dispatch } from "react";
import s from "./ProfilePage.module.css";
import noAvatar from "../../../../assets/images/noAvatar.svg";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AddPost from "../../components/AddPost";
import EditPost from "../../components/EditPost";
import PostItem from "../../components/PostItem";
import StatusContainer from "../../components/Status/Status";
import BirthdayContainer from "../../components/Birthday/Birthday";
import RelationshipContainer from "../../components/Relationship/Relationship";
import LivesContainer from "../../components/Lives/Lives";
import { RootState } from "../../../../redux/store";
import {
  actionsTypes,
  changeProfileImageAC,
  deleteFriendAC,
  endLoadProfileAC,
  setProfileDataAC,
  startLoadProfileAC,
} from "../../../../redux/actionTypes";
import { ProfileRequests } from "../../../../API/ProfileRequests";
import { addFileServer } from "../../../../services/uploadFiles";
import { FriendsRequests } from "../../../../API/FriendsRequests";
import { PostVM } from "../../../../models/view-models/post.vm";

interface OwnProps {}

interface PropsFromState {
  ownId: string;
  isLoaded: boolean;
  isOwnProfile: boolean;
  firstName: string;
  lastName: string;
  profileImg: string;
  posts: PostVM[];
  isFriend: boolean;
  isRequestSent: boolean;
}

interface PropsFromDispatch {
  loadProfile(userId: string, ownId: string): Promise<void>;
  addProfileImage(image: File): Promise<void>;
  deleteFriend(friendId: string): Promise<void>;
  addFriend(friendId: string): Promise<void>;
  cancelRequest(friendId: string): Promise<void>;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

function ProfilePage(props: AllProps) {
  const [profileImgHover, setProfileImgHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let loadProfile = props.loadProfile;
    loadProfile(location.pathname.slice("/profile/".length), props.ownId);
  }, [location.pathname, props.ownId, props.loadProfile]);
  
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
          {props.isOwnProfile && <AddPost />}
          <div className={s.posts}>
            {props.posts.map((post) => {
              if (post.editMode) {
                return <EditPost post={post} key={post.id} />;
              }
              return <PostItem post={post} key={post.id} />;
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

let mapStateToProps = (state: RootState): PropsFromState => {
  return {
    ownId: state.authData.id,
    isLoaded: state.profileData.isLoaded,
    isOwnProfile: state.profileData.isOwnProfile,
    firstName: state.profileData.firstName,
    lastName: state.profileData.lastName,
    profileImg: state.profileData.profileImg,
    posts: state.postsData.posts,
    isFriend: state.profileData.isFriend,
    isRequestSent: state.profileData.isRequestSent,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): PropsFromDispatch => {
  return {
    loadProfile: async (userId: string, ownId: string) => {
      dispatch(startLoadProfileAC());
      const profile = await ProfileRequests.getProfile(userId, ownId);
      dispatch(
        setProfileDataAC(
          profile.isOwnProfile,
          profile._id,
          profile.firstName,
          profile.lastName,
          profile.profileImg,
          profile.lives,
          profile.status,
          profile.birthDay,
          profile.relationship,
          profile.posts,
          profile.isFriend,
          profile.isRequestSent
        )
      );
      dispatch(endLoadProfileAC());
    },
    addProfileImage: async (image: File) => {
      try {
        if (!image) {
          return;
        }
        const fileURL = await addFileServer(image);
        const blobURL = URL.createObjectURL(image);
        await ProfileRequests.editProfileImage(fileURL);

        dispatch(changeProfileImageAC(blobURL));
      } catch (error) {
        console.log(error);
      }
    },

    deleteFriend: async (friendId: string) => {
      await FriendsRequests.removeFriend(friendId);
      dispatch(deleteFriendAC(friendId));
    },
    addFriend: async (friendId: string) => {
      await FriendsRequests.sendRequest(friendId);
      dispatch(deleteFriendAC(friendId));
    },
    cancelRequest: async (friendId: string) => {
      await FriendsRequests.cancelRequest(friendId);
      dispatch(deleteFriendAC(friendId));
    },
  };
};

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
