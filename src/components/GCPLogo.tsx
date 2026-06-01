import React from "react";

export const GCPLogo: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L2 17L12 22L22 17L22 7L12 2Z"
        fill="#4285F4"
        fillOpacity="0.1"
        stroke="#4285F4"
        strokeWidth="1"
      />
      <path
        d="M12 6L6 9V15L12 18L18 15V9L12 6Z"
        fill="#4285F4"
        fillOpacity="0.8"
      />
      <path d="M12 9.5L9.5 11V13L12 14.5L14.5 13V11L12 9.5Z" fill="white" />
    </svg>
  );
};
