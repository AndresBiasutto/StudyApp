import React from "react";
import type { selectProps } from "../../interfaces/selectProps";

const Select: React.FC<selectProps & {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}> = ({ name, className, items, value, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`font-pixelify ${className} my-4 w-full border rounded border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText`}
    >
      <option value="">Seleccionar rol</option>

      {items?.map((item) => (
        <option
          value={item.id_role}
          key={item.id_role}
          className="bg-lightPrimary dark:bg-darkPrimary"
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
