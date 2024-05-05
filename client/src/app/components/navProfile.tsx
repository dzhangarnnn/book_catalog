import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserData, getCurrentUserId } from "../store/users";
import { useAppSelector } from "../hooks/redux";
const NavProfile: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUserData());
  const currentUserId = useAppSelector(getCurrentUserId());

  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (!currentUser) return <span className="text-white">loading</span>;
  return (
    <div className="dropdown mx-3 navProfile" onClick={toggleMenu}>
      <div className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center">
        <div className="me-2 text-white">{currentUser.name}</div>
      </div>
      <div
        className={
          "w-100 dropdown-menu dropdown-menu-dark dropMenu" +
          (isOpen ? " show" : "")
        }
      >
        <Link to={`/users/${currentUserId}`} className="dropdown-item">
          Личный кабинет
        </Link>
        <Link to="/logout" className="dropdown-item">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
