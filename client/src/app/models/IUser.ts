import { IBookmark } from "./IBookmarks";

type IRole = "ADMIN" | "USER";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  bookmarks: IBookmark[] | undefined;
  roles: IRole[];
}
