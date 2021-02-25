import { connect } from "react-redux";
import ProfilePage from "./ProfilePage";
import {
  actionsTypes,
  changeProfileImageAC,
  endLoadProfileAC,
  setProfileDataAC,
  startLoadProfileAC,
} from "../../../../../redux/actionTypes";
import { RootState } from "../../../../../redux/store";
import { Dispatch } from "react";
import { ProfileRequests } from "../../../../../API/ProfileRequests";
import { addFileServer } from "../../../../Helpers/uploadFiles";
import { Post } from "../../../../../Model/post";

interface mapStateToPropsType {
  ownId: string;
  isLoaded: boolean;
  isOwnProfile: boolean;
  firstName: string;
  lastName: string;
  profileImg: string;
  posts: Post[];
}

interface mapDispatchToPropsType {
  loadProfile(userId: string, ownId: string): Promise<void>;
  addProfileImage(image: File): Promise<void>;
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
  return {
    ownId: state.authData.id,
    isLoaded: state.profileData.isLoaded,
    isOwnProfile: state.profileData.isOwnProfile,
    firstName: state.profileData.firstName,
    lastName: state.profileData.lastName,
    profileImg: state.profileData.profileImg,
    posts: state.profileData.posts,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<actionsTypes>
): mapDispatchToPropsType => {
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
          profile.posts
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
  };
};

const ProfilePageContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
export default ProfilePageContainer;
