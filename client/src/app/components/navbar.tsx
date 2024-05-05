import React from "react";
import { Outlet, Link } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";
import NavProfile from "./navProfile";
import SearchField from "./searchField";
import { useAppSelector } from "../hooks/redux";

const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return (
    <>
      <nav className="navbar  mb-3">
        <div className="container-fluid ">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-white " aria-current="page" to="/">
                Main
              </Link>
            </li>
          </ul>

          <SearchField />

          <div className="d-flex ">
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <Link
                className="nav-link text-white"
                aria-current="page"
                to="/login/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
