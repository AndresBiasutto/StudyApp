import type React from "react";
import EditorInput from "../../atoms/editorInput.atom";
import ButtonSquare from "../../atoms/buttonSquare.atom";
import { FiX } from "react-icons/fi";

interface DynamicResourceInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const DynamicResourceInput: React.FC<DynamicResourceInputProps> = ({
  value,
  placeholder,
  onChange,
  onRemove,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <EditorInput
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
      <div className="flex-shrink-0">
        <ButtonSquare
          btnName="Eliminar"
          icon={<FiX />}
          action={onRemove}
          bgLight="bg-lightDetail hover:bg-lightAccent"
          bgDark="dark:bg-darkDetail dark:hover:bg-darkAccent"
        />
      </div>
    </div>
  );
};

export default DynamicResourceInput;
