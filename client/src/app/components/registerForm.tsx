import React, { useEffect, useState } from "react";
import TextField from "./form/textField";
import { validator } from "../utils/validator";
import { getAuthErrors, signUp } from "../store/users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface IRegData {
  email: string;
  password: string;
  name: string;
}
interface IDirty {
  emailDirty: boolean;
  passwordDirty: boolean;
  nameDirty: boolean;
}

interface IError {
  email?: string;
  password?: string;
  name?: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<IRegData>({
    email: "",
    password: "",
    name: "",
  });
  const [dirty, setDirty] = useState<IDirty>({
    emailDirty: false,
    passwordDirty: false,
    nameDirty: false,
  });
  const registerError = useAppSelector(getAuthErrors());
  const [errors, setErrors] = useState<IError>({});

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const blurHandler: React.FocusEventHandler<HTMLInputElement> = (e) => {
    switch (e.target.name) {
      case "email":
        setDirty((prevState) => ({ ...prevState, emailDirty: true }));
        break;
      case "password":
        setDirty((prevState) => ({
          ...prevState,
          passwordDirty: true,
        }));
        break;
      case "name":
        setDirty((prevState) => ({
          ...prevState,
          nameDirty: true,
        }));
        break;
    }
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должено состаять минимум из 3 символов",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состаять миниму из 8 символов",
        value: 8,
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  function validate() {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(signUp(data, () => navigate("/")));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        blurHandler={blurHandler}
        dirty={dirty.emailDirty}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        blurHandler={blurHandler}
        dirty={dirty.nameDirty}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        blurHandler={blurHandler}
        dirty={dirty.passwordDirty}
        error={errors.password}
      />

      {registerError === "Пользователь с таким Email уже существует" && (
        <p className="text-danger">{registerError}</p>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
