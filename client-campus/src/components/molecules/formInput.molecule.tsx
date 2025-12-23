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
}) => {
  return (
    <div className="mb-4">
      <Label text={label} />
      <Input
        name={name}
        type={type}
        value={value}
        change={onChange}
        className={className}
      />
      {error && <Ptxt text={error} aditionalStyle={errorTextStyles} />}
    </div>
  );
};

export default FormInput;
