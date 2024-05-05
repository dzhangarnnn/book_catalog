import React from "react";
import _ from "lodash";
import { IUser } from "../../models/IUser";
import { IColumns } from "./table";

interface Props {
  data: IUser[];
  columns: IColumns;
  deleteColumn: {
    delete: {
      component: (user: IUser) => JSX.Element;
    };
  };
}

const TableBody: React.FC<Props> = ({ data, columns, deleteColumn }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>
              {_.get(item, columns[column as keyof IColumns].path)}
            </td>
          ))}
          <td>{deleteColumn.delete.component(item)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
