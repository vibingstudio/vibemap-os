import React from "react";

export default function BallLoading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "none",
        display: "block",
        shapeRendering: "auto",
      }}
      width="91px"
      height="91px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="31" cy="50" fill="#ff22a5" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="-0.5s"
        ></animate>
      </circle>
      <circle cx="69" cy="50" fill="#00b6de" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="31" cy="50" fill="#ff22a5" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          values="0;0;1;1"
          calcMode="discrete"
          keyTimes="0;0.499;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
}
