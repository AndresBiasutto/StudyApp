import { useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAppSelector } from "../../../../hooks/UseStore.hook";
import type { CalendarEntry } from "../../../../BR/domain/entities/calendar.interface";

const sortNotifications = (entries: CalendarEntry[]): CalendarEntry[] =>
  [...entries].sort((entryA, entryB) => {
    if (entryA.date !== entryB.date) {
      return entryA.date.localeCompare(entryB.date);
    }

    const hourA = entryA.hour ?? "99:99";
    const hourB = entryB.hour ?? "99:99";

    if (hourA !== hourB) {
      return hourA.localeCompare(hourB);
    }

    return entryA.title.localeCompare(entryB.title);
  });

const Notifications = () => {
  const calendarEntries = useAppSelector((state) => state.calendar.items);
  const currentUserId = useAppSelector((state) => state.auth.selected?.id_user);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const notifications = useMemo(() => {
    if (!currentUserId) {
      return [];
    }

    return sortNotifications(
      calendarEntries.filter((entry) => !dismissedIds.includes(entry.id)),
    );
  }, [calendarEntries, currentUserId, dismissedIds]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-20 flex max-w-sm flex-col gap-3 ">
      {notifications.map((notification) => (
        <article
          key={notification.id}
          className="flex items-start gap-3 rounded-2xl border border-lightBorder bg-lightAccent px-4 py-3 shadow-lg dark:border-darkBorder dark:bg-darkAccent"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-pixelify font-bold text-sm text-lightText dark:text-darkText">
              {notification.title}
            </p>
            <p className="truncate font-pixelify text-sm text-lightText dark:text-darkText">
              {notification.date} {notification.hour ? `- ${notification.hour}` : ""}
            </p>
          </div>

          <button
            type="button"
            aria-label="Cerrar notificacion"
            title="Cerrar notificacion"
            onClick={() =>
              setDismissedIds((currentIds) => [
                ...currentIds,
                notification.id,
              ])
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-lightBorder text-lightText transition hover:bg-lightDetail/20 dark:border-darkBorder dark:text-darkText dark:hover:bg-darkDetail/20 cursor-pointer "
          >
            <IoClose className="text-lg" />
          </button>
        </article>
      ))}
    </div>
  );
};

export default Notifications;
