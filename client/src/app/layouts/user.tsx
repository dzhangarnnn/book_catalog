import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { getCurrentUserData, getCurrentUserId } from "../store/users";
import UserPage from "../pages/userPage";
import { useAppSelector } from "../hooks/redux";

const User: React.FC = () => {
  const { userId } = useParams<string>();
  const currentUserId = useAppSelector(getCurrentUserId());
  const user = useAppSelector(getCurrentUserData());

  return (
    <div>
      {userId === currentUserId ? (
        <UserPage user={user} />
      ) : (
        <Navigate to={`/users/${currentUserId}`} />
      )}
    </div>
  );
};

export default User;
