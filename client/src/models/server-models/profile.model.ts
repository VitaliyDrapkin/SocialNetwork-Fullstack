import { Post } from "./post.model";

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  status: string;
  birthday: number;
  relationship: string;
  address: string;
  posts: Post[];
  photo?: string[];
  photoCount?: number;
  isFriend?: boolean;
  isRequestSent?: boolean;
}
