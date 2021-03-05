export class FriendsVM {
  public constructor(
    public friends: FriendVM[],
    public friendsRequestsSent: FriendVM[],
    public friendsRequestsReceived: FriendVM[]
  ) {}
}
export class FriendVM {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImg: string,
    public status: string
  ) {}
}
