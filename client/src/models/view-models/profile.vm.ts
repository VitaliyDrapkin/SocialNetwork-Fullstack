import { PostVM } from "./post.vm";

export class ProfileVM {
  public constructor(
    public isOwnProfile: boolean,
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImg: string,
    public status: string,
    public birthDay: number,
    public relationship: string,
    public posts: PostVM[],
    public lives: string,
    public isFriend?: boolean,
    public isRequestSent?: boolean
  ) {}
}
