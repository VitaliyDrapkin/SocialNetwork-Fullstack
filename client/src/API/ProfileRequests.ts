import { Post } from "./../models/post";
import { store } from "./../redux/store";
import {
  ProfileServerResponse,
  ProfileModel,
} from "./../models/profileResponse";
import { getValidToken, instance } from "./ApiSettings";

export const ProfileRequests = {
  getProfile: async (userId: string, ownId: string): Promise<ProfileModel> => {
    const response = await instance.get<ProfileServerResponse>(
      `/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    const newPosts = response.data.posts.map((postResponse) => {
      return new Post(
        postResponse._id,
        postResponse.userId._id,
        postResponse.userId.profileImage,
        postResponse.userId.firstName,
        postResponse.userId.lastName,
        postResponse.date,
        postResponse.text,
        postResponse.likes.length,
        postResponse.likes.includes(postResponse.userId._id),
        postResponse.comments,
        postResponse.imgUrl,
        false,
        postResponse.userId._id === store.getState().authData.id
      );
    });

    const profileResponse = {
      isOwnProfile: store.getState().authData.id === response.data._id,
      _id: response.data._id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      profileImg: response.data.profileImage,
      status: response.data.status,
      birthDay: response.data.birthday,
      relationship: response.data.relationship,
      lives: response.data.address,
      posts: newPosts,
      isFriend: response.data.isFriend,
      isRequestSent: response.data.isRequestSent,
    };
    return profileResponse;
  },

  editProfileImage: async (imageUrl: string) => {
    const response = await instance.put<string>(
      `/profile/image`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },

  editStatus: async (status: string) => {
    const response = await instance.put<string>(
      `/profile/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },

  editBirthday: async (birthday: number) => {
    const response = await instance.put<string>(
      `/profile/birthday`,
      { birthday },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },
  editLives: async (lives: string) => {
    const response = await instance.put<string>(
      `/profile/lives`,
      { lives },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },
  editRelationship: async (relationship: string) => {
    const response = await instance.put<string>(
      `/profile/relationship`,
      { relationship },
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },
};
