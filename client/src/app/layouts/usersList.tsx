import React, { useEffect, useState } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import { getUsersList, removeUser } from "../store/users";
import UserTable from "../components/usersTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../models/IUser";

export interface ISort {
  path: string;
  order: "asc" | "desc";
}

const UsersList: React.FC = () => {
  const users = useAppSelector(getUsersList());
  const [sortBy, setSortBy] = useState<ISort>({
    path: "name",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const pageSize = 2;

  const handleSort = (item: ISort) => {
    setSortBy(item);
  };
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleDelete = (userId: string) => {
    dispatch(removeUser(userId));
  };

  const count = users?.length;
  const sortedUsers = _.orderBy(users, [sortBy.path], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    if (count) {
      if (count <= pageSize) {
        setCurrentPage(1);
      }
      setCurrentPage(Math.ceil(count / pageSize));
    }
  }, [count]);

  return (
    <>
      {!!count && count > 0 && (
        <div className="d-flex flex-column">
          <UserTable
            users={usersCrop as IUser[]}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelete}
          />
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
    </>
  );
};

export default UsersList;
