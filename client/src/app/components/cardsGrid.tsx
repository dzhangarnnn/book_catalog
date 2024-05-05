import React from "react";
import BookCard from "./bookCard";
import { getCurrentUserData } from "../store/users";
import { IBook } from "../models/IBook";
import { useAppSelector } from "../hooks/redux";

interface CardsGridProps {
  books: IBook[];
  isBookmarks?: boolean;
}

const CardsGrid: React.FC<CardsGridProps> = ({
  books,
  isBookmarks = false,
}) => {
  const user = useAppSelector(getCurrentUserData());

  const rowClassName =
    "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" +
    (!isBookmarks ? " row-cols-xl-4" : "");

  //   if (!books) return "Книги не добавлены";

  return (
    <div className="container mb-5">
      <div className={rowClassName}>
        {books.map((book, i) => (
          <div className="col" key={book._id + i}>
            <BookCard book={book} user={user} isBookmarks={isBookmarks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
