import axios from "axios";
import { toast } from "react-toastify";
import { IResFromGBooks, IResItem } from "../models/IBook";

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});

googleBooksApi.interceptors.response.use(
  (res) => res,
  function (error: any) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("На сервере произошла ошибка. Попробуйте позже");
    }
    return Promise.reject(error);
  },
);
googleBooksApi.interceptors.request.use(
  (config) => config,
  function (error: any) {
    return Promise.reject(error);
  },
);

const googleBooksService = {
  getList: async (searchMethod: string, searchQuery: string) => {
    const { data } = await googleBooksApi.get<IResFromGBooks>(
      `?q=${searchMethod}${searchQuery}`,
      {
        params: {
          maxResults: 40,
        },
      },
    );
    return data;
  },
  getByCategory: async (category: string) => {
    const { data } = await googleBooksApi.get<IResFromGBooks>(
      `?q=subject:${category}`,
    );
    return data;
  },
  getOne: async (bookId: string) => {
    const { data } = await googleBooksApi.get<IResItem>(`/${bookId}`);
    return data;
  },
};

export default googleBooksService;
