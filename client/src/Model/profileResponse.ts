import { Post } from "./post";
import { PostsServerResponse } from "./postsServerResponse";
export class ProfileServerResponse {
  public constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImage: string,
    public status: string,
    public birthday: number,
    public relationship: string,
    public relationshipUser: any,
    public address: string,
    public posts: PostsServerResponse[],
    public photo?: string[],
    public photoCount?: number
  ) {}
}

export class ProfileModel {
  public constructor(
    public isOwnProfile: boolean,
    public _id: string,
    public firstName: string,
    public lastName: string,
    public profileImg: string,
    public status: string,
    public birthDay: number,
    public relationship: string,
    public posts: Post[],
    // public relationshipUser: any,
    public lives: string // public photo?: string[],
  ) // public photoCount?: number
  {}
}
