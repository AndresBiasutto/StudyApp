import type React from "react";

interface ToolbarButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, icon, onClick, title }) => {
  return (
    <button
      type="button"
      className="rounded border border-lightBorder dark:border-darkBorder bg-lightDetail dark:bg-darkDetail px-3 py-2 text-lightText dark:text-darkText transition-all hover:bg-lightAccent dark:hover:bg-darkAccent"
      onMouseDown={(event) => event.preventDefault()} // evita perder el foco del input editable
      onClick={onClick}
      title={title}
    >
      <span className="flex items-center gap-2 font-pixelify">
        {icon}
        {label}
      </span>
    </button>
  );
};

export default ToolbarButton;
