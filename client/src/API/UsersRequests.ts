import { getAccessTokenResponse, loginResponse } from "./../Model/authResponse";
import { registrationResponse } from "../Model/authResponse";
import { instance } from "./ApiSettings";

export const UsersRequests = {
  registration: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: number,
    gender: string
  ) => {
    const response = await instance.post<registrationResponse>(
      "/users/registration",
      {
        firstName,
        lastName,
        email,
        password,
        birthday,
        gender,
      }
    );
    return response.data; //userId + access token
  },

  login: async (email: string, password: string) => {
    const response = await instance.post<loginResponse>("/users/auth", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    await instance.delete<void>("/users/auth", {});
  },

  getAccessToken: async () => {
    const response = await instance.get<getAccessTokenResponse>(
      "/users/refresh"
    );
    return response.data.accessToken;
  },

  autoLogin: async () => {
    const response = await instance.get<loginResponse>("/users/autoLogin");
    return response.data;
  },
};
