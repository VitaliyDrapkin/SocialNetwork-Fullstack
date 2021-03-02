import { FriendsResponse, Friend, FriendsGroup } from "./../models/friend";
import { getValidToken, instance } from "./ApiSettings";

export const FriendsRequests = {
  getFriends: async (
    userId?: string
  ): Promise<{
    friends: Friend[];
    friendsRequestsSent: Friend[];
    friendsRequestsReceived: Friend[];
  }> => {
    const response = await instance.get<FriendsResponse>(`/friends/data`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    const friends = response.data.friends.map((friend) => {
      const newFriend = new Friend(
        friend._id,
        friend.firstName,
        friend.lastName,
        friend.profileImage,
        friend.status
      );
      return newFriend;
    });
    const friendsRequestsSent = response.data.friendsRequestSent.map(
      (friend) => {
        const newFriend = new Friend(
          friend._id,
          friend.firstName,
          friend.lastName,
          friend.profileImage,
          friend.status
        );
        return newFriend;
      }
    );
    const friendsRequestsReceived = response.data.friendsRequestReceived.map(
      (friend) => {
        const newFriend = new Friend(
          friend._id,
          friend.firstName,
          friend.lastName,
          friend.profileImage,
          friend.status
        );
        return newFriend;
      }
    );
    return { friends, friendsRequestsSent, friendsRequestsReceived };
  },

  getNewFriends: async (
    filter: string,
    start: number = 0
  ): Promise<Friend[]> => {
    const response = await instance.get<FriendsGroup[]>(
      `/friends/search?filter=${filter}&start=${start}`,
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    const friends = response.data.map((friend) => {
      const newFriend = new Friend(
        friend._id,
        friend.firstName,
        friend.lastName,
        friend.profileImage,
        friend.status
      );
      return newFriend;
    });
    return friends;
  },

  sendRequest: async (userId: string): Promise<string> => {
    const response = await instance.post<string>(
      `/friends/request/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },

  cancelRequest: async (userId: string): Promise<string> => {
    const response = await instance.delete<string>(
      `/friends/request/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${await getValidToken()}`,
        },
      }
    );
    return response.data;
  },

  confirmRequest: async (userId: string): Promise<string> => {
    const response = await instance.get<string>(`/friends/request/${userId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    return response.data;
  },

  removeFriend: async (userId: string): Promise<string> => {
    const response = await instance.delete<string>(`/friends/${userId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    return response.data;
  },
};
