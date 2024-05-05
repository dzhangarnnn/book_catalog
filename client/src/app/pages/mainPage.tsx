import React, { useState } from "react";
import BooksList from "../layouts/booksList";
import GroupList from "../components/groupList";
import { CATEGORIES } from "../constans/categories";
import { loadBooksByCategory } from "../store/books";
import { useAppDispatch } from "../hooks/redux";

const MainPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const dispatch = useAppDispatch();

  const handleItemSelect = (item: string): void => {
    setSelectedItem(item);
    dispatch(loadBooksByCategory(item));
  };


  return (
    <div className="container">
      <div className="row ">
        <div className="col-sm-auto  flex-shrink-0 mb-3">
          <h4 className="text-center">Категории</h4>
          <GroupList
            items={CATEGORIES}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
          />
        </div>
        <div className="col-sm">
          <BooksList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
