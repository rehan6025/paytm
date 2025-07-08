import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
