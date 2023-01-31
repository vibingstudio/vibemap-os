import React from "react";
import { FC } from "react";

type Props = {
  color: string;
};
export const Loader: FC<Props> = ({ color }) => {
  return (
    <div
      className=""
      style={{
        backgroundColor: "transparent",
      }}
    >
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          stroke={color}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};
