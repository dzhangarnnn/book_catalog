import React from "react";
import CaretDown from "../../static/svg/caretDown";
import CaretUp from "../../static/svg/caretUp";
import { ISort } from "../../layouts/usersList";
import { IColumns } from "./table";

interface Props {
  onSort: (item: ISort) => void;
  selectedSort: ISort;
  columns: IColumns;
}

const TableHeader: React.FC<Props> = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item: string) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  const rendeSortArrow = (selectedSort: ISort, currentPath: string) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return <CaretDown />;
      } else {
        return <CaretUp />;
      }
    }
    return null;
  };

  return (
    <thead className="thead ">
      <tr>
        {Object.keys(columns).map((column) => {
          if ("path" in columns[column as keyof IColumns])
            return (
              <th
                key={column}
                onClick={() =>
                  handleSort(columns[column as keyof IColumns].path)
                }
                {...{
                  role: columns[column as keyof IColumns].path && "button",
                }}
                scope="col"
              >
                {columns[column as keyof IColumns].name}{" "}
                {rendeSortArrow(
                  selectedSort,
                  columns[column as keyof IColumns].path,
                )}
              </th>
            );
        })}
        <th>Удалить</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
