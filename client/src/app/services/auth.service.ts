import localStorageService from "./localStorage.service";
import configFile from "../config.json";
import axios from "axios";
import { ILogin, ISignup } from "../models/IAuth";
import { ITokens } from "../models/ITokens";

const httpAuth = axios.create({
  baseURL: configFile.apiEndpoint + "auth/",
});

const authService = {
  register: async (payload: ISignup) => {
    const { data } = await httpAuth.post<ITokens>(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }: ILogin) => {
    const { data } = await httpAuth.post<ITokens>(`signInWithPassword`, {
      email,
      password,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post<ITokens>("token", {
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
