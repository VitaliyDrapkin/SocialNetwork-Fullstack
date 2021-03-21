import { refreshTokenAC } from "./../redux/actionTypes";
import { UsersRequests } from "./UsersRequests";
import { store } from "./../redux/store";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export const instance = Axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL: "https://powerful-bastion-15998.herokuapp.com/",
  withCredentials: true,
});

export const getValidToken = async (): Promise<string | false> => {
  let token = store.getState().authData.accessToken;
  if (!token) {
    alert("No access token ");
    return false;
  }
  const decodedToken: { data: string; exp: number } = jwt_decode(token);
  if (decodedToken.exp * 1000 < new Date().getTime() + 10000) {
    //+10sec
    token = await UsersRequests.getAccessToken();
    store.dispatch(refreshTokenAC(token));
  }
  return token;
};
