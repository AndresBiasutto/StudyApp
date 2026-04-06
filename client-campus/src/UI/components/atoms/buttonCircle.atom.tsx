import type React from "react";

interface ButtonCircleProps {
  icon: React.ReactNode;
  action?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  className?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  icon,
  action,
  ariaLabel,
  className = "",
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={action}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-lightBorder bg-lightSecondary text-lightText shadowDN transition hover:scale-105 dark:border-darkBorder dark:bg-darkSecondary dark:text-darkText ${className}`}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );
};

export default ButtonCircle;
