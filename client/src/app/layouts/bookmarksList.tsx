import React, { useEffect, useState } from "react";
import GroupList from "../components/groupList";
import {
  loadBooksByBookmarksArr,
  getBookmarksList,
  isBookmarksListLoading,
} from "../store/books";
import CardsGrid from "../components/cardsGrid";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import { bookmarksGroupList } from "../constans/categories";
import LoadSpinner from "../components/loadSpinner";
import { IUser } from "../models/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IBook } from "../models/IBook";

interface Props {
  user: IUser;
}

const BookmarksList: React.FC<Props> = ({ user }) => {
  const books = useAppSelector(getBookmarksList());
  const isLoading = useAppSelector(isBookmarksListLoading());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState("select");
  const dispatch = useAppDispatch();
  const pageSize = 3;
  const bookIdArr = user?.bookmarks?.map((bk) => bk.bookId);
  useEffect(() => {
    if (bookIdArr?.[0]) {
      dispatch(loadBooksByBookmarksArr(bookIdArr));
    }
  }, []);

  const handlePageChange = (pageIndex: number): void => {
    setCurrentPage(pageIndex);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedItem]);

  const bookmarksList = books
    ? selectedItem === bookmarksGroupList[0].value
      ? books.filter(
          (b) =>
            user?.bookmarks?.some(
              (bk) => bk.bookId === b._id && bk.read === false,
            ),
        )
      : books.filter(
          (b) =>
            user?.bookmarks?.some(
              (bk) => bk.bookId === b._id && bk.read === true,
            ),
        )
    : [];

  const count = bookmarksList.length;

  useEffect(() => {
    if (count <= pageSize) {
      setCurrentPage(1);
    }
    setCurrentPage(Math.ceil(count / pageSize));
  }, [count]);

  const booksCrop = paginate(bookmarksList, currentPage, pageSize);

  const handleItemSelect = (item: string): void => {
    setSelectedItem(item);
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-auto  pb-3">
          <GroupList
            items={bookmarksGroupList}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            horizontal={true}
          />
        </div>
        {!books && isLoading && <LoadSpinner />}
        {!!booksCrop[0] && (
          <div className="d-flex flex-column ">
            <CardsGrid books={booksCrop as IBook[]} isBookmarks={true} />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
        {books && !bookmarksList[0] && (
          <div className="d-flex justify-content-center">
            Книги не добавлены
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksList;
