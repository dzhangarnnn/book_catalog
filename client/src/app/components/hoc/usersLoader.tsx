import React, { useEffect } from "react";
import { getDataStatus, loadUsersList } from "../../store/users";
import LoadSpinner from "../loadSpinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface Props {
  children: React.JSX.Element;
}

const UsersLoader: React.FC<Props> = ({ children }) => {
  const dataStatus = useAppSelector(getDataStatus());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, [dataStatus]);

  if (!dataStatus) return <LoadSpinner />;

  return children;
};

export default UsersLoader;
