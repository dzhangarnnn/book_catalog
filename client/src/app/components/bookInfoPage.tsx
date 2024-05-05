import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookmarksList, getBooksList } from "../store/books";
import { getCurrentUserData, getIsLoggedIn, updateUser } from "../store/users";
import BookMark from "./bookmark";
import Comments from "./comments";
import UsersLoader from "./hoc/usersLoader";
import BookDescription from "./bookDescription";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../models/IUser";

const BookInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bookId } = useParams<string>();
  const booksList = useAppSelector(getBooksList());
  const bookmarksList = useAppSelector(getBookmarksList());
  const user = useAppSelector(getCurrentUserData());
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const status = user?.bookmarks?.some((b) => b.bookId === bookId);

  useEffect(() => {
    if (!booksList && !bookmarksList) {
      navigate("/", { replace: true });
    }
  }, [booksList, bookmarksList]);

  const currentBook =
    location.state?.from?.pathname === "/"
      ? booksList?.find((b) => b._id === bookId)
      : booksList?.find((b) => b._id === bookId)
        ? booksList.find((b) => b._id === bookId)
        : bookmarksList?.find((b) => b._id === bookId);

  const authors = currentBook?.authors?.join(", ");
  const img = currentBook?.imageLinks?.thumbnail;
  const title = currentBook?.title;
  const categories = currentBook?.categories?.[0];
  const description = currentBook?.description;

  const handleToggleBookmark = (id: string): void => {
    if (!isLoggedIn) {
      navigate("/login/login", {
        state: { from: location },
      });
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

  return (
    <div className="container">
      <BookDescription
        img={img}
        title={title}
        categories={categories}
        authors={authors}
        description={description}
      />
      <div className="bookmark-bookInfo">
        {!!bookId && (
          <BookMark
            status={status}
            onClick={() => handleToggleBookmark(bookId)}
          />
        )}
      </div>
      <button
        className="btn btn-secondary btn-back"
        onClick={() => navigate("/")}
      >
        Назад
      </button>
      {isLoggedIn && (
        <UsersLoader>
          <div className="row justify-content-center mt-5">
            <div className="col col-md-10 col-lg-8">
              <Comments />
            </div>
          </div>
        </UsersLoader>
      )}
    </div>
  );
};

export default BookInfoPage;
