import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { fetchCalendarEntries } from "../../../../store/slices/calendarSlice/calendar.thunk";
import { openModal, setModalContent } from "../../../../store/slices/uiSlice";
import type { CalendarEntry } from "../../../../BR/domain/entities/calendar.interface";
import CalendarDayView from "../../molecules/calendarDayView.molecule";
import CalendarMonthView from "../../molecules/calendarMonthView.molecule";
import CalendarSidebar from "../../molecules/calendarSidebar.molecule";
import CalendarToolbar from "../../molecules/calendarToolbar.molecule";
import CalendarWeekView from "../../molecules/calendarWeekView.molecule";
import CalendarYearView from "../../molecules/calendarYearView.molecule";
import {
  addDays,
  addMonths,
  addYears,
  buildEventMap,
  buildMonthCells,
  buildWeekDays,
  buildYearSummary,
  formatSelectedDate,
  getHeaderTitle,
  startOfDay,
  startOfMonth,
  startOfYear,
  toIsoDate,
} from "./calendar.utils";
import type { CalendarView } from "./calendar.types";
import type { CalendarModalData } from "../../../../store/slices/calendarSlice/calendar.type";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined);
  const [selectedView, setSelectedView] = useState<CalendarView>("month");
  const [menuOpen, setMenuOpen] = useState(false);
  const calendarState = useAppSelector((state) => state.calendar);
  const currentUserId = useAppSelector((state) => state.auth.selected?.id_user);
  const currentUserRole = useAppSelector((state) => state.auth.selected?.Role?.name);

  useEffect(() => {
    if (currentUserId) {
      void dispatch(fetchCalendarEntries());
    }
  }, [currentUserId, dispatch]);

  const eventsMap = useMemo(
    () => buildEventMap(calendarState.items),
    [calendarState.items],
  );

  const visibleReferenceDate = useMemo(() => {
    switch (selectedView) {
      case "year":
        return startOfYear(selectedDate);
      case "month":
        return startOfMonth(selectedDate);
      case "week":
      case "day":
      default:
        return startOfDay(selectedDate);
    }
  }, [selectedDate, selectedView]);

  const monthCells = useMemo(
    () => buildMonthCells(visibleReferenceDate, selectedDate, eventsMap),
    [eventsMap, selectedDate, visibleReferenceDate],
  );

  const weekDays = useMemo(
    () => buildWeekDays(selectedDate, eventsMap),
    [eventsMap, selectedDate],
  );

  const yearSummary = useMemo(
    () => buildYearSummary(visibleReferenceDate, today, eventsMap),
    [eventsMap, today, visibleReferenceDate],
  );

  const selectedEvents = eventsMap[toIsoDate(selectedDate)] ?? [];
  const selectedScheduledEvents = selectedEvents.filter((event) => event.hour);
  const selectedUnscheduledEvents = selectedEvents.filter((event) => !event.hour);
  const selectedDateLabel = formatSelectedDate(selectedDate);
  const headerTitle = getHeaderTitle(selectedView, visibleReferenceDate);

  const selectDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setSelectedHour(undefined);
  };

  const selectTimeSlot = (isoDate: string, hour: string) => {
    const [year, month, day] = isoDate.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setSelectedHour(hour);
  };

  const openCalendarModal = () => {
    const modalData: CalendarModalData = {
      selectedDate: toIsoDate(selectedDate),
      selectedHour,
      item: null,
    };

    dispatch(
      setModalContent({
        type: "CALENDAR_EVENT",
        data: modalData,
        title: "Nuevo evento de calendario",
      }),
    );
    dispatch(openModal());
  };

  const openCalendarEventModal = (item: CalendarEntry) => {
    const [year, month, day] = item.date.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, day));
    setSelectedHour(item.hour ?? undefined);

    dispatch(
      setModalContent({
        type: "CALENDAR_EVENT",
        data: {
          selectedDate: item.date,
          selectedHour: item.hour ?? undefined,
          item,
        },
        title: "Editar evento del calendario",
      }),
    );
    dispatch(openModal());
  };

  const handleGoToToday = () => {
    setSelectedDate(today);
    setSelectedHour(undefined);
    setMenuOpen(false);
  };

  const handleNavigate = (direction: "previous" | "next") => {
    const delta = direction === "previous" ? -1 : 1;

    setSelectedDate((currentDate) => {
      switch (selectedView) {
        case "day":
          return addDays(currentDate, delta);
        case "week":
          return addDays(currentDate, delta * 7);
        case "year":
          return addYears(currentDate, delta);
        case "month":
        default:
          return addMonths(currentDate, delta);
      }
    });
    setSelectedHour(undefined);
    setMenuOpen(false);
  };

  const renderMainView = () => {
    switch (selectedView) {
      case "day":
        return (
          <CalendarDayView
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            scheduledEvents={selectedScheduledEvents}
            unscheduledEvents={selectedUnscheduledEvents}
            onSelectTimeSlot={selectTimeSlot}
          />
        );
      case "week":
        return <CalendarWeekView days={weekDays} onSelectDate={selectDate} />;
      case "year":
        return <CalendarYearView summary={yearSummary} onSelectDate={selectDate} />;
      case "month":
      default:
        return <CalendarMonthView cells={monthCells} onSelectDate={selectDate} />;
    }
  };

  return (
    <section className="mt-8 flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-lightBorder bg-lightSecondary/55 shadow-md dark:border-darkBorder dark:bg-darkSecondary/55">
      <header className="flex flex-col gap-4 border-b border-lightBorder px-5 py-5 dark:border-darkBorder lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-sharetech text-xs uppercase tracking-[0.25em] text-lightLink dark:text-darkLink">
            Agenda docente
          </p>
          <h3 className="mt-2 font-pixelify text-3xl capitalize text-lightText dark:text-darkText">
            {headerTitle}
          </h3>
          <p className="mt-1 font-sharetech text-sm text-lightText/75 dark:text-darkText/75">
            {selectedDateLabel}
          </p>
          {calendarState.loadingList && (
            <p className="mt-2 font-sharetech text-xs text-lightText/70 dark:text-darkText/70">
              Cargando eventos...
            </p>
          )}
          {calendarState.error && (
            <p className="mt-2 font-sharetech text-xs text-lightWarning dark:text-darkWarning">
              {calendarState.error}
            </p>
          )}
        </div>

        <CalendarToolbar
          selectedView={selectedView}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((currentValue) => !currentValue)}
          onSelectView={(view) => {
            setSelectedView(view);
            setMenuOpen(false);
          }}
          onPrevious={() => handleNavigate("previous")}
          onToday={handleGoToToday}
          onNext={() => handleNavigate("next")}
        />
      </header>

      <div
        className={`grid gap-4 p-4 ${
          selectedView === "year" ? "" : "xl:grid-cols-[minmax(0,1fr)_320px]"
        }`}
      >
        <div>{renderMainView()}</div>

        {selectedView !== "year" && (
          <CalendarSidebar
            selectedDateLabel={selectedDateLabel}
            selectedEvents={selectedEvents}
            currentUserRole={currentUserRole}
            onCreate={openCalendarModal}
            onOpenEvent={openCalendarEventModal}
          />
        )}
      </div>
    </section>
  );
}
