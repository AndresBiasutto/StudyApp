import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

import { useForm } from "../../../../hooks/UseForm.hook";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import {
  closeModal,
  setModalContent,
} from "../../../../store/slices/uiSlice";
import type { RootState } from "../../../../store/store";
import Button from "../../atoms/button.atom";
import Label from "../../atoms/label.atom";
import Ptxt from "../../atoms/P.atom";
import Textarea from "../../atoms/textarea.atom";
import FormInput from "../../molecules/formInput.molecule";
import {
  createCalendarEntry,
  deleteCalendarEntry,
  updateCalendarEntry,
} from "../../../../store/slices/calendarSlice/calendar.thunk";
import type { CalendarModalData } from "../../../../store/slices/calendarSlice/calendar.type";
import type { CalendarEntryPayload } from "../../../../BR/domain/entities/calendar.interface";

interface CalendarEventFormData {
  title: string;
  text: string;
  hour: string;
  [key: string]: string;
}

const initialState: CalendarEventFormData = {
  title: "",
  text: "",
  hour: "",
};

const validate = (data: CalendarEventFormData) => {
  const errors: Partial<Record<keyof CalendarEventFormData, string>> = {};

  if (!data.title.trim()) {
    errors.title = "Debe ingresar un titulo";
  }

  if (!data.text.trim()) {
    errors.text = "Debe ingresar una descripcion";
  }

  if (data.hour.trim() && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.hour.trim())) {
    errors.hour = "Debe ingresar una hora valida";
  }

  return errors;
};

const formatModalDate = (value: string): string => {
  const [year, month, day] = value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);
};

const CalendarEventForm = () => {
  const dispatch = useAppDispatch();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const modalData = useAppSelector(
    (state: RootState) => state.ui.modalContent.data,
  ) as CalendarModalData | null;
  const calendarState = useAppSelector((state: RootState) => state.calendar);
  const authUser = useAppSelector((state: RootState) => state.auth.selected);
  const currentRole = authUser?.Role?.name ?? null;

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
  } = useForm<CalendarEventFormData>(initialState, validate);

  const selectedDate = modalData?.selectedDate ?? "";
  const selectedItem = modalData?.item ?? null;
  const canCreateEvents = currentRole === "teacher" || currentRole === "admin";
  const canEditSelectedEvent = selectedItem?.emisor === authUser?.id_user;
  const canSubmit = selectedItem ? canEditSelectedEvent : canCreateEvents;

  useEffect(() => {
    setValues({
      title: selectedItem?.title ?? "",
      text: selectedItem?.text ?? "",
      hour: selectedItem?.hour ?? modalData?.selectedHour ?? "",
    });
  }, [modalData?.selectedHour, selectedItem, setValues]);

  const closeCalendarModal = () => {
    dispatch(closeModal());
    dispatch(
      setModalContent({
        type: "",
        data: null,
        title: "",
      }),
    );
  };

  const onSubmit = async (data: CalendarEventFormData) => {
    if (!canSubmit) {
      setSubmitError("No tienes permisos para realizar esta accion");
      return;
    }

    if (!selectedDate) {
      setSubmitError("No se encontro una fecha seleccionada");
      return;
    }

    if (!authUser?.id_user) {
      setSubmitError("No se pudo identificar al usuario actual");
      return;
    }

    const payload: CalendarEntryPayload = {
      title: data.title.trim(),
      text: data.text.trim(),
      date: selectedDate,
      hour: data.hour.trim() || undefined,
      receptor: selectedItem?.receptor ?? [],
      role: authUser.Role?.name ?? selectedItem?.role ?? null,
    };

    try {
      if (selectedItem?.id) {
        await dispatch(
          updateCalendarEntry({
            id: selectedItem.id,
            data: payload,
          }),
        ).unwrap();
        setSubmitSuccess("Evento actualizado correctamente");
      } else {
        await dispatch(createCalendarEntry(payload)).unwrap();
        setSubmitSuccess("Evento guardado correctamente");
      }

      setSubmitError(null);

      setTimeout(() => {
        closeCalendarModal();
        setSubmitSuccess(null);
      }, 700);
    } catch (error) {
      console.error("Error guardando evento del calendario:", error);
      setSubmitSuccess(null);
      setSubmitError("No se pudo guardar el evento");
    }
  };

  const handleDelete = async () => {
    if (!selectedItem?.id) {
      return;
    }

    try {
      await dispatch(deleteCalendarEntry(selectedItem.id)).unwrap();
      closeCalendarModal();
    } catch (error) {
      console.error("Error eliminando evento del calendario:", error);
      setSubmitError("No se pudo eliminar el evento");
    }
  };

  const inputBaseStyles =
    "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
    "text-lightText dark:text-darkText border border-lightBorder " +
    "dark:border-darkBorder focus:outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  const errorTextStyles =
    "mt-1 text-sm text-lightWarning dark:text-darkWarning";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-lightBorder bg-lightSecondary p-8 shadow-md dark:border-darkBorder dark:bg-darkSecondary"
    >
      <div className="mb-4 rounded-md border border-lightBorder bg-lightPrimary px-4 py-3 dark:border-darkBorder dark:bg-darkPrimary">
        <Ptxt text={`Fecha seleccionada: ${formatModalDate(selectedDate)}`} />
      </div>

      <FormInput
        label="Titulo"
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.title}
        errorTextStyles={errorTextStyles}
        readOnly={!canSubmit}
      />

      <div className="mb-2">
        <Label text="Descripcion breve" />
        <Textarea
          name="text"
          value={values.text}
          onChange={handleChange}
          rows={4}
          placeholder="Escribe una breve descripcion del evento"
          readOnly={!canSubmit}
        />
        {errors.text && (
          <Ptxt text={errors.text} aditionalStyle={errorTextStyles} />
        )}
      </div>

      <FormInput
        label="Hora (opcional)"
        name="hour"
        type="time"
        value={values.hour}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.hour}
        errorTextStyles={errorTextStyles}
        readOnly={!canSubmit}
      />

      {canSubmit ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            btnName={selectedItem?.id ? "Actualizar evento" : "Guardar evento"}
            type="submit"
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
            icon={<FaCheck />}
          />

          {selectedItem?.id && (
            <Button
              btnName="Eliminar evento"
              type="button"
              action={handleDelete}
              bgLight="bg-lightWarning"
              bgDark="dark:bg-darkWarning"
              icon={<FaTrash />}
            />
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            btnName="Cerrar"
            type="button"
            action={closeCalendarModal}
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
          />
        </div>
      )}

      {submitError && (
        <Ptxt
          text={submitError}
          aditionalStyle="mt-4 text-lightWarning dark:text-darkWarning"
        />
      )}

      {submitSuccess && <Ptxt text={submitSuccess} aditionalStyle="mt-4" />}

      {(calendarState.creating || calendarState.updating || calendarState.deleting) && (
        <Ptxt text="Procesando cambios..." aditionalStyle="mt-4" />
      )}
    </form>
  );
};

export default CalendarEventForm;
