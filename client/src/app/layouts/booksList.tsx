import React, { useEffect, useState } from "react";
import { getBooksList, isBooksListLoading } from "../store/books";
import CardsGrid from "../components/cardsGrid";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import LoadSpinner from "../components/loadSpinner";
import { useAppSelector } from "../hooks/redux";
import { IBook } from "../models/IBook";

const BooksList: React.FC = () => {
  const books = useAppSelector(getBooksList());
  const isLoading = useAppSelector(isBooksListLoading());
  const [currentPage, setCurrentPage] = useState(1);
  const count = books?.length;
  const pageSize = 8;
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  let booksCrop;
  if (books) {
    booksCrop = paginate(books, currentPage, pageSize);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  if (isLoading) {
    return <LoadSpinner />;
  }
  return (
    <div>
      {!!count && booksCrop && (
        <div className="d-flex flex-column">
          <CardsGrid books={booksCrop as IBook[]} />
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
      {count === 0 && (
        <p className="text-center">Книги по данному запросу не найдены</p>
      )}
    </div>
  );
};

export default BooksList;
