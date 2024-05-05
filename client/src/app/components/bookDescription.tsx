import React from "react";
import noCover from "../assets/no_cover_thumb.gif";

interface BookDescriptionProps {
  img: string | undefined;
  title: string | undefined;
  categories: string | undefined;
  authors: string | undefined;
  description: string | undefined;
}

const BookDescription: React.FC<BookDescriptionProps> = ({
  img,
  title,
  categories,
  authors,
  description,
}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 mt-5">
      <div className="col-sm-4 offset-sm-1 p-3 d-flex justify-content-center imgBookContainer">
        <img
          className="shadow  img-bookInfo"
          src={img || noCover}
          alt={title}
        />
      </div>
      <div className="col-sm pt-2 px-5 ">
        <div className="fw-light mb-3">{categories}</div>
        <h3 className="mb-2">{title}</h3>
        <div className="fw-lighter text-decoration-underline mb-2">
          {authors}
        </div>
        <p className={`fw-light ${description && "border"} rounded p-2`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BookDescription;
