import React from "react";

interface Props {
  role: string;
  onClick: () => void;
}

const RemoveIcon: React.FC<Props> = ({ role, ...rest }) => {
  const isActive = role !== "ADMIN";

  return (
    <button
      disabled={!isActive}
      className="btn btn-outline-danger btn-sm"
      {...rest}
    >
      <span aria-hidden="true">X</span>
    </button>
  );
};

export default RemoveIcon;
