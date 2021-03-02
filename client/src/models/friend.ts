export class Friend {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImg: string,
    public status: string
  ) {}
}

export class FriendsResponse {
  public constructor(
    public friends: FriendsGroup[],
    public friendsRequestSent: FriendsGroup[],
    public friendsRequestReceived: FriendsGroup[]
  ) {}
}

export class FriendsGroup {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImage: string,
    public status: string
  ) {}
}
