import React from "react";

const InputBox = React.forwardRef(
  ({ onKeyDown, id, placeholder, label, onchange }, ref) => {
    return (
      <div>
        <label
          className="text-sm font-medium py-2 block text-left"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          ref={ref} // ✅ ref now works!
          onKeyDown={onKeyDown}
          className="border-gray-300 border py-1 w-full px-2 rounded-md"
          id={id}
          type={label === "Password" ? "password" : "text"}
          placeholder={placeholder}
          onChange={onchange}
        />
      </div>
    );
  }
);

export default InputBox;
