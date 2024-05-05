import React from "react";
import LogOut from "./layouts/logOut";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./layouts/login";
import { Navigate, Route, Routes } from "react-router-dom";
import User from "./layouts/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserLoader from "./components/hoc/currentUserLoader";
import MainPage from "./pages/mainPage";
import BookInfoPage from "./components/bookInfoPage";

function App() {
  return (
    <>
      <CurrentUserLoader>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MainPage />} />
            <Route path="books/:bookId" element={<BookInfoPage />} />
            <Route
              path="users/:userId"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="login/:type" element={<Login />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </CurrentUserLoader>
      <ToastContainer />
    </>
  );
}

export default App;
