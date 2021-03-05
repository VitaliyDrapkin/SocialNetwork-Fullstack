export interface Friends {
  friends: Friend[];
  friendsRequestSent: Friend[];
  friendsRequestReceived: Friend[];
}
export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  status: string;
}
