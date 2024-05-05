import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { ISort } from "../../layouts/usersList";
import { IUser } from "../../models/IUser";

export interface IColumns {
  name: {
    path: string;
    name: string;
  };
  email: {
    path: string;
    name: string;
  };
  roles: {
    path: string;
    name: string;
  };
}

interface TableProps {
  onSort: (item: ISort) => void;
  selectedSort: ISort;
  columns: IColumns;
  data: IUser[];
  deleteColumn: {
    delete: {
      component: (user: IUser) => JSX.Element;
    };
  };
  children?: React.JSX.Element;
}

const Table: React.FC<TableProps> = ({
  onSort,
  selectedSort,
  columns,
  data,
  deleteColumn,
  children,
}) => {
  return (
    <table className="table table-hover shadow-sm">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data, deleteColumn }} />
        </>
      )}
    </table>
  );
};

export default Table;
