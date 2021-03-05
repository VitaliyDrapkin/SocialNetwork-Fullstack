import {
  registration,
  login,
  accessToken,
} from "./../models/server-models/auth.model";
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
    try {
      const response = await instance.post<registration>(
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
    } catch (error) {
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    const response = await instance.post<login>("/users/auth", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    await instance.delete<void>("/users/auth", {});
  },

  getAccessToken: async () => {
    const response = await instance.get<accessToken>("/users/refresh");
    return response.data.accessToken;
  },

  autoLogin: async () => {
    const response = await instance.get<login>("/users/autoLogin");
    return response.data;
  },
};
