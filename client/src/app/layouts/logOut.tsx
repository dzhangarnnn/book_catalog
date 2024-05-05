import React, { useEffect } from "react";
import { logOut } from "../store/users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut(() => navigate("/")));
  }, []);
  return <h1>Loading</h1>;
};

export default LogOut;
