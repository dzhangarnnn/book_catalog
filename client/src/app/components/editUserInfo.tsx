import React, { useEffect, useState } from "react";
import TextField from "./form/textField";
import { validator } from "../utils/validator";
import { updateUser } from "../store/users";
import { IUser } from "../models/IUser";
import { useAppDispatch } from "../hooks/redux";

interface Props {
  user: IUser;
  setSelectedItem: (item: string) => void;
}

interface IData {
  name: string;
  email: string;
}
interface IErrors {
  name?: string;
  email?: string;
}
const EditUserInfo: React.FC<Props> = ({ user, setSelectedItem }) => {
  const [data, setData] = useState<IData>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<IErrors>({});
  const [dirty, setDirty] = useState({
    emailDirty: false,
    nameDirty: false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setData({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleChange = (target: { name: string; value: string }): void => {
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
  };

  useEffect(() => {
    validate();
  }, [data]);

  function validate(): boolean {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const isValid =
    Object.keys(errors).length === 0 &&
    (data.name !== user.name || data.email !== user.email);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateUser(data));
    setSelectedItem("Закладки");
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 offset-md-2 shadow-lg p-4">
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

            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
