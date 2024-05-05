import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const Login = () => {
  const { type } = useParams();

  const [formType, setFormType] = useState<"register" | "login">(
    type === "register" ? type : "login",
  );
  const toggleFormType: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register",
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p className="mt-3">
                Уже есть аккаунт?{" "}
                <a
                  title="перейти для входа"
                  role="button"
                  onClick={toggleFormType}
                >
                  <b>Войти</b>
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Вход</h3>
              <LoginForm />
              <p className="mt-3">
                Еще нет аккаунта?{" "}
                <a
                  title="перейти для регистрации"
                  role="button"
                  onClick={toggleFormType}
                >
                  <b>Зарегистрируйтесь</b>
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
