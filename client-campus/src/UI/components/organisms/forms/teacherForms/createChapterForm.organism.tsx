import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import type { Unit } from "../../../../../BR/domain/entities/unit.interface";
import { useForm } from "../../../../../hooks/UseForm.hook";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/UseStore.hook";
import { createChapter } from "../../../../../store/slices/chapterSlice/chapter.thunk";
import { fetchSubjectById } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import FormInput from "../../../molecules/formInput.molecule";

interface CreateChapterFormData {
  name: string;
  description: string;
  order: string;
  [key: string]: string;
}

interface CreateChapterFormProps {
  item: Unit | null;
}

const initialState: CreateChapterFormData = {
  name: "",
  description: "",
  order: "",
};

const validate = (data: CreateChapterFormData) => {
  const errors: Partial<Record<keyof CreateChapterFormData, string>> = {};

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

const CreateChapterForm: React.FC<CreateChapterFormProps> = ({ item }) => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.chapters);
  const [created, setCreated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { values, errors, handleChange, handleSubmit } =
    useForm<CreateChapterFormData>(initialState, validate);

  const onSubmit = async (data: CreateChapterFormData) => {
    const unitId = item?.id_unit;
    if (!unitId) {
      setSubmitError("No se encontro la unidad para crear el capitulo");
      return;
    }

    try {
      setSubmitError(null);
      const result = await dispatch(
        createChapter({
          name: data.name,
          description: data.description,
          order: Number(data.order),
          id_unit: unitId,
        })
      );

      if (!createChapter.fulfilled.match(result)) {
        throw new Error("No se pudo crear el capitulo");
      }

      if (id_subject) {
        await dispatch(fetchSubjectById(id_subject));
      }

      setCreated(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setCreated(false);
      }, 1500);
    } catch (error) {
      setSubmitError("No se pudo crear el capitulo");
      console.error("Error creando capitulo:", error);
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
        label="Nombre del capitulo"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.name}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Descripcion del capitulo"
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.description}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label="Orden del capitulo"
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

      {created && <Ptxt text="Capitulo creado exitosamente" />}
    </form>
  );
};

export default CreateChapterForm;
