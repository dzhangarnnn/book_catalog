import { IUpdate } from "../models/IAuth";
import { IUser } from "../models/IUser";
import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get<{ content: IUser[] }>(userEndpoint);
    return data;
  },
  update: async (payload: IUpdate) => {
    const { data } = await httpService.patch<{ content: IUser }>(
      userEndpoint + localStorageService.getUserId(),
      payload,
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get<{ content: IUser }>(
      userEndpoint + localStorageService.getUserId(),
    );

    return data;
  },
  removeUser: async (userId: string) => {
    const { data } = await httpService.delete<{ content: "" }>(
      userEndpoint + userId,
      {
        params: {
          orderBy: "userId",
          equalTo: `${userId}`,
        },
      },
    );
    return data;
  },
};

export default userService;
