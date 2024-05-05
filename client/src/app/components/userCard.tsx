import React from "react";

interface UserCardProps {
  name: string;
  email: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <div className="card m-3 p-0">
      <div className="card-body bg-light">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
      </div>
    </div>
  );
};

export default UserCard;
