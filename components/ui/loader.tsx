"use client";

import { ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};
