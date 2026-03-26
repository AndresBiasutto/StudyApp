import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useForm } from "../../../../../hooks/UseForm.hook";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/UseStore.hook";
import { fetchSubjectById } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import { createUnit } from "../../../../../store/slices/unitSlice/unit.thunk";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import FormInput from "../../../molecules/formInput.molecule";

interface CreateUnitFormData {
  name: string;
  description: string;
  order: string;
  [key: string]: string;
}

const initialState: CreateUnitFormData = {
  name: "",
  description: "",
  order: "",
};

const validate = (data: CreateUnitFormData) => {
  const errors: Partial<Record<keyof CreateUnitFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = "Debe ingresar un nombre";
  }

  if (!data.description.trim()) {
    errors.description = "Debe ingresar una descripcion";
  }

  if (!data.order.trim()) {
    errors.order = "Debe ingresar un orden";
  } else if (Number.isNaN(Number(data.order))) {
    errors.order = "El orden debe ser numerico";
  }

  return errors;
};

const CreateUnitForm = () => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const [created, setCreated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { loading } = useAppSelector((state) => state.units);
  const { values, errors, handleChange, handleSubmit } =
    useForm<CreateUnitFormData>(initialState, validate);

  const onSubmit = async (data: CreateUnitFormData) => {
    if (!id_subject) {
      setSubmitError("No se encontro la materia para crear la unidad");
      return;
    }

    try {
      setSubmitError(null);
      const result = await dispatch(
        createUnit({
          name: data.name,
          description: data.description,
          order: Number(data.order),
          id_subject,
        })
      );

      if (!createUnit.fulfilled.match(result)) {
        throw new Error("No se pudo crear la unidad");
      }

      await dispatch(fetchSubjectById(id_subject));
      setCreated(true);

      setTimeout(() => {
        dispatch(toggleModal());
        setCreated(false);
      }, 1500);
    } catch (error) {
      setSubmitError("No se pudo crear la unidad");
      console.error("Error creando unidad:", error);
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
      <FormInput
        label="Nombre de la unidad"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.name}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Descripcion de la unidad"
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.description}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Orden de la unidad"
        name="order"
        type="number"
        value={values.order}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.order}
        errorTextStyles={errorTextStyles}
      />

      <Button
        btnName={loading ? "Creando..." : "Crear"}
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

      {created && <Ptxt text="Unidad creada exitosamente" />}
    </form>
  );
};

export default CreateUnitForm;
