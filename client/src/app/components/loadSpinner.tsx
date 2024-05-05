import React from "react";
import { ColorRing } from "react-loader-spinner";

const LoadSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ColorRing
        visible={true}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default LoadSpinner;
