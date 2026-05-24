import { FaCheck } from "react-icons/fa";
import { useState } from "react";

import { useForm } from "../../../../hooks/UseForm.hook";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { toggleModal } from "../../../../store/slices/uiSlice";
import type { RootState } from "../../../../store/store";
import Button from "../../atoms/button.atom";
import Label from "../../atoms/label.atom";
import Ptxt from "../../atoms/P.atom";
import Textarea from "../../atoms/textarea.atom";
import FormInput from "../../molecules/formInput.molecule";
import {
  saveCalendarEvent,
  type CalendarModalData,
} from "../common/calendar-events.storage";

interface CalendarEventFormData {
  title: string;
  description: string;
  [key: string]: string;
}

const initialState: CalendarEventFormData = {
  title: "",
  description: "",
};

const validate = (data: CalendarEventFormData) => {
  const errors: Partial<Record<keyof CalendarEventFormData, string>> = {};

  if (!data.title.trim()) {
    errors.title = "Debe ingresar un titulo";
  }

  if (!data.description.trim()) {
    errors.description = "Debe ingresar una descripcion";
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
  const [created, setCreated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const modalData = useAppSelector(
    (state: RootState) => state.ui.modalContent.data,
  ) as CalendarModalData | null;

  const { values, errors, handleChange, handleSubmit } =
    useForm<CalendarEventFormData>(initialState, validate);

  const selectedDate = modalData?.selectedDate ?? "";

  const onSubmit = (data: CalendarEventFormData) => {
    if (!selectedDate) {
      setSubmitError("No se encontro una fecha seleccionada");
      return;
    }

    try {
      saveCalendarEvent(selectedDate, {
        title: data.title.trim(),
        description: data.description.trim(),
      });

      setSubmitError(null);
      setCreated(true);

      setTimeout(() => {
        dispatch(toggleModal());
        setCreated(false);
      }, 900);
    } catch (error) {
      setSubmitError("No se pudo guardar el evento");
      console.error("Error guardando evento del calendario:", error);
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
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
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
      />

      <div className="mb-2">
        <Label text="Descripcion breve" />
        <Textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          placeholder="Escribe una breve descripcion del evento"
        />
        {errors.description && (
          <Ptxt text={errors.description} aditionalStyle={errorTextStyles} />
        )}
      </div>

      <Button
        btnName="Guardar evento"
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
        icon={<FaCheck />}
      />

      {submitError && (
        <Ptxt
          text={submitError}
          aditionalStyle="mt-4 text-lightWarning dark:text-darkWarning"
        />
      )}

      {created && <Ptxt text="Evento guardado correctamente" />}
    </form>
  );
};

export default CalendarEventForm;
