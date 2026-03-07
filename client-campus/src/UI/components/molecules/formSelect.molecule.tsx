import React from "react";
import Label from "../atoms/label.atom";
import Ptxt from "../atoms/P.atom";

interface formSelectProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  items?: { id: string; name: string; }[];
  error?: string;
  errorTextStyles?: string;
}

const FormSelect: React.FC<formSelectProps> = ({
  label,
  name,
  value,
  handleChange,
  items = [],
  error,
  errorTextStyles,
}) => {
  return (
    <div className="mb-1">
      <Label text={label} />
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`font-pixelify h-10 pl-2 w-full rounded bg-lightPrimary dark:bg-darkPrimary text-gray-500`}
      >
        <option className="bg-lightPrimary dark:bg-darkPrimary text-gray-500" value="">
          Seleccionar
        </option>
        {items.map((item) => (
          <option
            value={item.id}
            key={item.id}
            className="bg-lightPrimary dark:bg-darkPrimary text-lightText dark:text-darkText"
          >
            {item.name}
          </option>
        ))}
      </select>
            {error && <Ptxt text={error} aditionalStyle={errorTextStyles} />}
    </div>
  );
};

export default FormSelect;
