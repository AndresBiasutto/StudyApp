import type React from "react";

import type { CalendarEntry } from "../../../BR/domain/entities/calendar.interface";
import { formatEventPreview } from "../organisms/common/calendar.utils";

interface CalendarEventPillProps {
  event: CalendarEntry;
  className?: string;
}

const CalendarEventPill: React.FC<CalendarEventPillProps> = ({
  event,
  className = "",
}) => {
  return (
    <span
      className={`truncate rounded-md bg-lightAccent/20 px-2 py-1 font-sharetech text-xs text-lightText dark:bg-darkAccent/20 dark:text-darkText ${className}`}
    >
      {formatEventPreview(event)}
    </span>
  );
};

export default CalendarEventPill;
