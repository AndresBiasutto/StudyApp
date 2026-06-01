import type React from "react";

interface CalendarDateBadgeProps {
  dayNumber: number;
  isSelected: boolean;
  isToday: boolean;
  compact?: boolean;
}

const CalendarDateBadge: React.FC<CalendarDateBadgeProps> = ({
  dayNumber,
  isSelected,
  isToday,
  compact = false,
}) => {
  const sizeStyles = compact
    ? "ml-auto h-7 w-7 text-xs"
    : "h-8 w-8 text-sm";

  return (
    <time
      className={`flex items-center justify-center rounded-full font-sharetech ${sizeStyles} ${
        isSelected
          ? "bg-lightText text-lightPrimary dark:bg-darkText dark:text-darkPrimary"
          : isToday
            ? "bg-lightLink text-lightPrimary dark:bg-darkLink dark:text-darkPrimary"
            : "text-lightText dark:text-darkText"
      }`}
    >
      {dayNumber}
    </time>
  );
};

export default CalendarDateBadge;
