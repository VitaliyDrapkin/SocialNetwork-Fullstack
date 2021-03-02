export class PostsServerResponse {
  public constructor(
    public _id: string,
    public userId: UserCommentOnPosts,
    public date: number,
    public text: string,
    public imgUrl: string | null,
    public likes: string[],
    public comments: CommentForPostsServer[]
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
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImage: string
  ) {}
}

class UsersLiked {
  public constructor(public _id: string) {}
}
