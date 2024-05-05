import _ from "lodash";
import { IBook } from "../models/IBook";
import { IUser } from "../models/IUser";

export function paginate(
  items: Array<IBook | IUser>,
  pageNumber: number,
  pageSize: number,
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
