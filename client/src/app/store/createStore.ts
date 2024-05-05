import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import booksReducer from "./books";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  users: usersReducer,
  books: booksReducer,
  comments: commentsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
