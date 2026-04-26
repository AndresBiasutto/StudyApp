import type React from "react";
import type { ChangeEvent } from "react";

interface TextareaProps {
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = "",
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`w-full rounded border border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary px-3 py-2 font-sharetech text-lightText dark:text-darkText outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent resize-none ${className}`}
    />
  );
};

export default Textarea;
