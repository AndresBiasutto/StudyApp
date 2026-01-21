import type React from "react";
import type { inputProps } from "../../interfaces/inputProps";

const Input: React.FC<inputProps> = ({name, type,  value, change, className, label}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={change}
      placeholder={label}
      className={`font-pixelify ${className}`}
    />
  );
};

export default Input;
