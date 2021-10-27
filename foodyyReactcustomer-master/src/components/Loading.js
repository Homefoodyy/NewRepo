import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animations/loading.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};
const Loading = ({ msg, loading = true }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ width: "100%", height: "50vh" }}
    >
      {loading && <Lottie options={defaultOptions} height={200} width={200} />}

      <h2>{msg}</h2>
    </div>
  );
};

export default Loading;
