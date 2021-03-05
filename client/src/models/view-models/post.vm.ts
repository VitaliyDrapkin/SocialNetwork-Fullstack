export class PostVM {
  public constructor(
    public id: string,
    public userId: string,
    public userProfileImg: string,
    public userFirstName: string,
    public userLastName: string,
    public date: number,
    public text: string,
    public likes: number,
    public liked: boolean,
    public comments: CommentVM[],
    public postImgUrl: string,
    public editMode: boolean,
    public ownPost: boolean
  ) {}
}

export class CommentVM {
  public constructor(
    public _id: string,
    public text: string,
    public date: number,
    public userId: UserWM
  ) {}
}

export class UserWM {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImage: string
  ) {}
}
