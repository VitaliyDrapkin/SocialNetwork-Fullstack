export interface Post {
  _id: string;
  userId: User;
  date: number;
  text: string;
  imgUrl: string | null;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  _id: string;
  text: string;
  date: number;
  userId: User;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}
