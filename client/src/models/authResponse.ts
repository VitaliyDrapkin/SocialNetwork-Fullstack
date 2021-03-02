export class registrationResponse {
  public constructor(public _id: string, public accessToken: string) {}
}

export class loginResponse {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public birthday: number,
    public gender: string,
    public accessToken: string,
    public profileImg: string
  ) {}
}

export class CommentForPostsServer {
  public constructor(
    public _id: string,
    public text: string,
    public date: number,
    public userId: UserCommentOnPosts
  ) {}
}

class UserCommentOnPosts {
  public constructor(public _id: string, public userName: string) {}
}

export class getAccessTokenResponse {
  public constructor(public accessToken: string) {}
}
