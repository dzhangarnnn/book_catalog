import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { generetaAuthError } from "../utils/generateAuthError";
import userService from "../services/user.service";
import { IUser } from "../models/IUser";
import { IAuth, ILogin, ISignup, IUpdate } from "../models/IAuth";
import { AppDispatch, RootState } from "./createStore";
import axios from "axios";

interface UserState {
  currentuser: IUser | null;
  usersList: IUser[] | null;
  isCurrentUserLoading: boolean;
  isUsersLoading: boolean;
  error: string | null;
  auth: IAuth | null;
  isLoggedIn: boolean;
  usersLoaded: boolean;
}

const initialState: UserState = localStorageService.getAccessToken()
  ? {
      currentuser: null,
      usersList: null,
      isCurrentUserLoading: false,
      isUsersLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      usersLoaded: false,
    }
  : {
      currentuser: null,
      usersList: null,
      isCurrentUserLoading: false,
      isUsersLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      usersLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authRequestSuccess: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    currentUserRequested: (state) => {
      state.isCurrentUserLoading = true;
    },
    currentUserReceived: (state, action: PayloadAction<IUser>) => {
      state.currentuser = action.payload;
      state.isCurrentUserLoading = false;
    },
    currentUsersRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isCurrentUserLoading = false;
    },
    userLoggedOut: (state) => {
      state.usersList = null;
      state.currentuser = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.usersLoaded = false;
    },
    userUpdateSuccessed: (state, action: PayloadAction<IUser>) => {
      state.currentuser = action.payload;
    },
    userUpdateFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    userUpdateRequested: (state) => {
      state.error = null;
    },
    usersRequested: (state) => {
      state.isUsersLoading = true;
    },
    usersReceived: (state, action: PayloadAction<IUser[]>) => {
      state.usersList = action.payload;
      state.usersLoaded = true;
      state.isUsersLoading = false;
    },
    usersRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isUsersLoading = false;
    },
    userRemoveRequested: (state) => {
      state.error = null;
    },
    userRemoveFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  authRequestSuccess,
  authRequested,
  authRequestFailed,
  currentUserRequested,
  currentUserReceived,
  currentUsersRequestFailed,
  userLoggedOut,
  userUpdateRequested,
  userUpdateSuccessed,
  userUpdateFailed,
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userRemoveRequested,
  userRemoveFailed,
} = actions;

const userRemoveSuccessed = createAction("users/userRemoveSuccessed ");

const defaultErrMessage = "На сервере произошла ошибка. Попробуйте позже";

export const signUp =
  (payload: ISignup, cb: () => void) => async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      cb();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          const { code, message } = err.response.data.error;
          if (code === 400) {
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestFailed(errorMessage));
          } else {
            dispatch(authRequestFailed(message));
          }
        } else {
          dispatch(authRequestFailed(defaultErrMessage));
        }
      } else {
        dispatch(authRequestFailed(defaultErrMessage));
      }
    }
  };

export const login =
  (payload: ILogin, cb: () => void) => async (dispatch: AppDispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      cb();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          const { code, message } = err.response.data.error;
          if (code === 400) {
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestFailed(errorMessage));
          } else {
            dispatch(authRequestFailed(message));
          }
        } else {
          dispatch(authRequestFailed(defaultErrMessage));
        }
      } else {
        dispatch(authRequestFailed(defaultErrMessage));
      }
    }
  };

export const loadCurrentUser = () => async (dispatch: AppDispatch) => {
  dispatch(currentUserRequested());
  try {
    const { content } = await userService.getCurrentUser();
    dispatch(currentUserReceived(content));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        dispatch(currentUsersRequestFailed(err.response.data.message));
      } else {
        dispatch(currentUsersRequestFailed(defaultErrMessage));
      }
    } else {
      dispatch(currentUsersRequestFailed(defaultErrMessage));
    }
  }
};

export const loadUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        dispatch(usersRequestFailed(err.response.data.message));
      } else {
        dispatch(usersRequestFailed(defaultErrMessage));
      }
    } else {
      dispatch(usersRequestFailed(defaultErrMessage));
    }
  }
};

export const updateUser =
  (payload: IUpdate) => async (dispatch: AppDispatch) => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSuccessed(content));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          dispatch(userUpdateFailed(err.response.data.message));
        } else {
          dispatch(userUpdateFailed(defaultErrMessage));
        }
      } else {
        dispatch(userUpdateFailed(defaultErrMessage));
      }
    }
  };

export const removeUser = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(userRemoveRequested());
  try {
    await userService.removeUser(userId);
    dispatch(userRemoveSuccessed());
    dispatch(loadUsersList());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        dispatch(userRemoveFailed(err.response.data.message));
      } else {
        dispatch(userRemoveFailed(defaultErrMessage));
      }
    } else {
      dispatch(userRemoveFailed(defaultErrMessage));
    }
  }
};

export const logOut = (cb: () => void) => (dispatch: AppDispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  cb();
};

export const getUserById = (userId: string) => (state: RootState) => {
  if (state.users.usersList) {
    return state.users.usersList.find((u) => u._id === userId);
  }
};

export const getCurrentUserData = () => (state: RootState) =>
  state.users.currentuser;
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getAuthErrors = () => (state: RootState) => state.users.error;
export const getCurrentUserId = () => (state: RootState) => {
  if (state.users.auth) return state.users.auth.userId;
};
export const getCurentUserLoadingStatus = () => (state: RootState) =>
  state.users.isCurrentUserLoading;
export const getDataStatus = () => (state: RootState) =>
  state.users.usersLoaded;
export const getUsersList = () => (state: RootState) => state.users.usersList;

export default usersReducer;
