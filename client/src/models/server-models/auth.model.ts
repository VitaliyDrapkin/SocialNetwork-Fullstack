export interface login {
  _id: string;
  firstName: string;
  lastName: string;
  birthday: number;
  gender: string;
  accessToken: string;
  profileImg: string;
}

export interface registration {
  _id: string;
  accessToken: string;
}

export interface accessToken {
  accessToken: string;
}
