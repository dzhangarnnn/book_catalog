import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookMark from "./bookmark";
import noCover from "../../app/assets/no_cover_thumb.gif";
import { getIsLoggedIn } from "../store/users";
import { IBook } from "../models/IBook";
import { IUser } from "../models/IUser";
import { updateUser } from "../store/users";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface BookCardProps {
  book: IBook;
  user: IUser | null;
  isBookmarks: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, user, isBookmarks }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const status = user?.bookmarks?.some((b) => b.bookId === book._id);
  const read = user?.bookmarks?.some(
    (b) => b.bookId === book._id && b.read === true,
  );
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const navigate = useNavigate();
  const authors = book.authors?.join(", ");
  const img = book.imageLinks?.thumbnail;
  const title = book.title;
  const firstCategory = book.categories?.[0];

  const handleToggleBookmark = (id: string): void => {
    if (!isLoggedIn) {
      navigate("/login/login", { state: { from: location } });
    } else {
      if (user?.bookmarks) {
        if (status && user?.bookmarks) {
          dispatch(
            updateUser({
              ...user,
              bookmarks: [...user.bookmarks.filter((b) => b.bookId !== id)],
            } as IUser),
          );
        } else {
          dispatch(
            updateUser({
              ...user,
              bookmarks: [...user.bookmarks, { bookId: id, read: false }],
            } as IUser),
          );
        }
      }
    }
  };

  const handleToggleRead = (id: string) => {
    if (user?.bookmarks) {
      dispatch(
        updateUser({
          ...user,
          bookmarks: [
            ...user.bookmarks.map((b) => {
              if (b.bookId === id) {
                return { ...b, read: !read };
              }
              return b;
            }),
          ],
        } as IUser),
      );
    }
  };

  return (
    <div className="card bg-light text-center h-100">
      <div className="card-img-container d-flex justify-content-center p-4">
        <Link
          to={`/books/${book._id}`}
          state={{ from: location }}
          className="text-decoration-none text-reset"
        >
          <img
            className="card-img-top shadow"
            src={img || noCover}
            alt={`${book.title}`}
          />
        </Link>
      </div>

      <div className="card-body ">
        <h6 className="card-subtitle fw-light  my-2">{firstCategory}</h6>
        <Link
          to={`/books/${book._id}`}
          state={{ from: location }}
          className="text-decoration-none text-reset"
        >
          <h5 className="card-title">{title}</h5>
        </Link>

        <p className="card-text fw-light">{authors}</p>
      </div>
      <div className="bookmark-card">
        <BookMark
          status={status}
          onClick={() => handleToggleBookmark(book._id)}
        />
      </div>
      {isBookmarks && (
        <button
          className="btn btn-secondary"
          onClick={() => handleToggleRead(book._id)}
        >
          {read ? "удалить из прочитанного" : "добавить в прочитанное"}
        </button>
      )}
    </div>
  );
};

export default BookCard;
