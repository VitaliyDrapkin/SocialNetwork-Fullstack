export class Post {
  public constructor(
    public id: string,
    public userProfileImg: string,
    public userFirstName: string,
    public userLastName: string,
    public date: number,
    public text: string,
    public likes: number,
    public liked: boolean,
    public comments: Comment[],
    public postImgUrl?: string,
    public editMode?: boolean
  ) {}
}

export class Comment {
  public constructor(
    public _id: string,
    public text: string,
    public date: number,
    public userId: UserComment //Для того чтоб спокойно добовлять
  ) {}
}

class UserComment {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImage: string
  ) {}
}
