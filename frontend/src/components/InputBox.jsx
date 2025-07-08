import React from "react";

const InputBox = ({ id, placeholder, label, onchange }) => {
  return (
    <div>
      <label className="text-sm font-medium py-2 block text-left" htmlFor={id}>
        {label}
      </label>
      <input
        className="border-gray-300 border py-1 w-full px-2 rounded-md"
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
};

export default InputBox;
