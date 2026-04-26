import type React from "react";
import type { inputProps } from "../../interfaces/inputProps";

const Input: React.FC<inputProps> = ({
  name,
  type,
  value,
  change,
  className,
  label,
  disabled,
  readOnly,
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={change}
      placeholder={label}
      disabled={disabled}
      readOnly={readOnly}
      className={`font-pixelify ${className}`}
    />
  );
};

export default Input;
