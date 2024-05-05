import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import googleBooksService from "../services/googleBooksApiService";
import { IBook, IResFromGBooks, IResItem } from "../models/IBook";
import axios from "axios";
import { AppDispatch, RootState } from "./createStore";

interface BookState {
  booksList: IBook[] | null;
  bookmarksList: IBook[] | null;
  error: string | null;
  isBooksListLoading: boolean;
  isBookmarksListLoading: boolean;
}

const initialState = {
  booksList: null,
  bookmarksList: null,
  error: null,
  isBooksListLoading: false,
  isBookmarksListLoading: false,
} as BookState;

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    booksListRequested: (state) => {
      state.isBooksListLoading = true;
    },
    booksListReceived: (state, action: PayloadAction<IBook[]>) => {
      state.booksList = action.payload;
      state.isBooksListLoading = false;
    },
    booksListRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isBooksListLoading = false;
    },
    booksByCategoryRequested: (state) => {
      state.isBooksListLoading = true;
    },
    booksByCategoryReceived: (state, action: PayloadAction<IBook[]>) => {
      state.booksList = action.payload;
      state.isBooksListLoading = false;
    },
    booksByCategoryFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isBooksListLoading = false;
    },
    bookmarksListRequested: (state) => {
      state.isBookmarksListLoading = true;
    },
    bookmarksListReceived: (state, action: PayloadAction<IBook[]>) => {
      state.bookmarksList = action.payload;
      state.isBookmarksListLoading = false;
    },
    bookmarksListFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isBookmarksListLoading = false;
    },
  },
});

const { reducer: booksReducer, actions } = booksSlice;
const {
  booksListRequested,
  booksListReceived,
  booksListRequestFailed,
  booksByCategoryRequested,
  booksByCategoryReceived,
  booksByCategoryFailed,
  bookmarksListRequested,
  bookmarksListReceived,
  bookmarksListFailed,
} = actions;

const defaultErrMessage = "На сервере произошла ошибка. Попробуйте позже";

export const loadBooksList =
  (searchMethod: string, searchQuery: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(booksListRequested());
    try {
      const data = await googleBooksService.getList(searchMethod, searchQuery);
      const booksArr = getArrayFromResponse(data);
      dispatch(booksListReceived(booksArr));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.message) {
          dispatch(booksListRequestFailed(err.message));
        }
        dispatch(booksListRequestFailed(defaultErrMessage));
      } else {
        dispatch(booksListRequestFailed(defaultErrMessage));
      }
    }
  };

export const loadBooksByCategory =
  (category: string) => async (dispatch: AppDispatch) => {
    dispatch(booksByCategoryRequested());
    try {
      const data = await googleBooksService.getByCategory(category);
      const booksArr = getArrayFromResponse(data);
      dispatch(booksByCategoryReceived(booksArr));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.message) {
          dispatch(booksByCategoryFailed(err.message));
        }
        dispatch(booksByCategoryFailed(defaultErrMessage));
      } else {
        dispatch(booksByCategoryFailed(defaultErrMessage));
      }
    }
  };

function getArrayFromResponse(data: IResFromGBooks) {
  const booksArr: IBook[] = [];
  if (data.totalItems > 0) {
    data.items.forEach((item) => {
      booksArr.push({
        _id: item.id,
        title: item.volumeInfo.title,
        subtitle: item.volumeInfo?.subtitle,
        authors: item.volumeInfo?.authors,
        description: item.volumeInfo?.description,
        imageLinks: item.volumeInfo?.imageLinks,
        publishedDate: item.volumeInfo?.publishedDate,
        publisher: item.volumeInfo?.publisher,
        categories: item.volumeInfo?.categories,
      });
    });
  }
  return booksArr;
}

export const loadBooksByBookmarksArr =
  (bkArr: string[]) => (dispatch: AppDispatch) => {
    dispatch(bookmarksListRequested());
    try {
      const promArr = bkArr.map((bk) => googleBooksService.getOne(bk));

      Promise.allSettled(promArr).then((data) =>
        dispatch(
          bookmarksListReceived(
            (
              data.filter(
                (d) => d.status === "fulfilled",
              ) as PromiseFulfilledResult<IResItem>[]
            ).map((d) => ({
              _id: d.value.id,
              title: d.value.volumeInfo.title,
              subtitle: d.value.volumeInfo?.subtitle,
              authors: d.value.volumeInfo?.authors,
              description: d.value.volumeInfo?.description,
              imageLinks: d.value.volumeInfo?.imageLinks,
              publishedDate: d.value.volumeInfo?.publishedDate,
              publisher: d.value.volumeInfo?.publisher,
              categories: d.value.volumeInfo?.categories,
            })),
          ),
        ),
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.message) {
          dispatch(bookmarksListFailed(err.message));
        }
        dispatch(bookmarksListFailed(defaultErrMessage));
      } else {
        dispatch(bookmarksListFailed(defaultErrMessage));
      }
    }
  };

export const getBookmarksList = () => (state: RootState) =>
  state.books.bookmarksList;
export const getBooksList = () => (state: RootState) => state.books.booksList;
export const isBooksListLoading = () => (state: RootState) =>
  state.books.isBooksListLoading;
export const isBookmarksListLoading = () => (state: RootState) =>
  state.books.isBookmarksListLoading;

export default booksReducer;
