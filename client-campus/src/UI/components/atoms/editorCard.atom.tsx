import type React from "react";

interface EditorCardProps {
  children: React.ReactNode;
  className?: string;
}

const EditorCard: React.FC<EditorCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full rounded border border-lightBorder dark:border-darkBorder bg-lightSecondary dark:bg-darkSecondary p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default EditorCard;
