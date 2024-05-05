import React, { useState } from "react";
import EyeSlash from "../../static/svg/eye-slash";
import Eye from "../../static/svg/eye";

interface TextFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (target: { name: string; value: string }) => void;
  error: string | undefined;
  blurHandler: React.FocusEventHandler<HTMLInputElement>;
  dirty: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  blurHandler,
  dirty,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  const getInputClasses = () => {
    return "form-control" + (error && dirty ? " is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={blurHandler}
          className={getInputClasses()}
        />

        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
        {error && dirty && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
