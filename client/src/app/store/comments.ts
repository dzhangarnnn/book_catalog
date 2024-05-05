import {
  Action,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { IComment } from "../models/IComment";
import axios from "axios";
import { RootState } from "./createStore";

interface CommentState {
  entities: IComment[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  entities: null,
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentList.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(addNewComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        if (!state.entities) {
          state.entities = [action.payload];
        } else {
          state.entities.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(removeComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        if (state.entities) {
          state.entities = state.entities.filter(
            (c) => c._id !== action.payload,
          );
          state.isLoading = false;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const { reducer: commentsReducer } = commentsSlice;

function isError(action: Action) {
  return action.type.endsWith("rejected");
}

const defaultErrMessage = "На сервере произошла ошибка. Попробуйте позже";

export const fetchCommentList = createAsyncThunk<
  IComment[],
  string,
  { rejectValue: string }
>("comments/fetchCommentList", async function (bookId, { rejectWithValue }) {
  try {
    const { content } = await commentService.getComments(bookId);
    return content;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(defaultErrMessage);
      }
    } else {
      return rejectWithValue(defaultErrMessage);
    }
  }
});

export const addNewComment = createAsyncThunk<
  IComment,
  { content: string; bookPageId: string },
  { rejectValue: string }
>("comments/addNewComment", async function (data, { rejectWithValue }) {
  try {
    const { content } = await commentService.createComment(data);
    return content;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(defaultErrMessage);
      }
    } else {
      return rejectWithValue(defaultErrMessage);
    }
  }
});

export const removeComment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("comments/removeComment", async function (commentId, { rejectWithValue }) {
  try {
    await commentService.removeComment(commentId);
    return commentId;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(defaultErrMessage);
      }
    } else {
      return rejectWithValue(defaultErrMessage);
    }
  }
});

export const getComments = () => (state: RootState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading;

export default commentsReducer;
