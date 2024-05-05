import React, { useEffect } from "react";
import {
  getCurentUserLoadingStatus,
  getIsLoggedIn,
  loadCurrentUser,
} from "../../store/users";
import LoadSpinner from "../loadSpinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface Props {
  children: React.JSX.Element;
}

const CurrentUserLoader: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const dispatch = useAppDispatch();
  const currentUserStatusLoading = useAppSelector(getCurentUserLoadingStatus());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCurrentUser());
    }
  }, [isLoggedIn]);

  if (currentUserStatusLoading) {
    return (
      <>
        <LoadSpinner />
      </>
    );
  }
  return children;
};

export default CurrentUserLoader;
