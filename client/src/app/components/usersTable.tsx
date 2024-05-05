import React from "react";
import Table from "./table";
import RemoveIcon from "../static/svg/removeIcon";
import { IUser } from "../models/IUser";
import { ISort } from "../layouts/usersList";

interface Props {
  users: IUser[];
  onSort: (item: ISort) => void;
  selectedSort: ISort;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({
  users,
  onSort,
  selectedSort,
  onDelete,
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
    },
    email: {
      path: "email",
      name: "Электронная почта",
    },
    roles: {
      path: "roles",
      name: "Статус пользователя",
    },
  };

  const deleteColumn = {
    delete: {
      component: (user: IUser) => (
        <RemoveIcon onClick={() => onDelete(user._id)} role={user.roles[0]} />
      ),
    },
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
      deleteColumn={deleteColumn}
    />
  );
};

export default UserTable;
