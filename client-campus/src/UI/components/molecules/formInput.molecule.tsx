// src/components/molecules/formInput.molecule.tsx
import type React from "react";
import Input from "../atoms/input.atom";
import Label from "../atoms/label.atom";
import Ptxt from "../atoms/P.atom";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  errorTextStyles?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  className,
  error,
  errorTextStyles,
  disabled,
  readOnly,
}) => {
  return (
    <div className="mb-1">
      <Label text={label} />
      <Input
        name={name}
        type={type}
        label={label}
        value={value}
        change={onChange}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
      />
      {error && <Ptxt text={error} aditionalStyle={errorTextStyles} />}
    </div>
  );
};
export default FormInput;
