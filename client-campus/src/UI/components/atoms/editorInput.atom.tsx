import type React from "react";
import type { ChangeEvent } from "react";

interface EditorInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const EditorInput: React.FC<EditorInputProps> = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded border border-lightBorder dark:border-darkBorder bg-lightPrimary dark:bg-darkPrimary px-3 py-2 font-sharetech text-lightText dark:text-darkText outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent ${className}`}
    />
  );
};

export default EditorInput;
