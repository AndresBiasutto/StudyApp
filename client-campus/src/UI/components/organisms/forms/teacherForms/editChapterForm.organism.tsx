import { useState } from "react";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import type { Chapter } from "../../../../../BR/domain/entities/chapter.interface";
import { useForm } from "../../../../../hooks/UseForm.hook";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/UseStore.hook";
import { fetchSubjectById } from "../../../../../store/slices/subjectSlice/subject.thunk";
import { toggleModal } from "../../../../../store/slices/uiSlice";
import { updateChapter } from "../../../../../store/slices/chapterSlice/chapter.thunk";
import Button from "../../../atoms/button.atom";
import Ptxt from "../../../atoms/P.atom";
import FormInput from "../../../molecules/formInput.molecule";

interface EditChapterFormData {
  id_chapter: string;
  name: string;
  description: string;
  order: string;
  [key: string]: string;
}

interface EditChapterFormProps {
  item: Chapter | null;
}

const initialState: EditChapterFormData = {
  id_chapter: "",
  name: "",
  description: "",
  order: "",
};

const validate = (data: EditChapterFormData) => {
  const errors: Partial<Record<keyof EditChapterFormData, string>> = {};

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

const EditChapterForm: React.FC<EditChapterFormProps> = ({ item }) => {
  const { id_subject } = useParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.chapters);
  const [updated, setUpdated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { values, errors, handleChange, handleSubmit } =
    useForm<EditChapterFormData>(initialState, validate);

  const onSubmit = async (data: EditChapterFormData) => {
    const chapterId = item?.id_chapter;
    if (!chapterId) {
      console.log(chapterId);

      setSubmitError("No se encontro el capitulo a editar");
      return;
    }

    try {
      setSubmitError(null);
      const result = await dispatch(
        updateChapter({
          id: chapterId,
          data: {
            name: data.name,
            description: data.description,
            order: Number(data.order),
          },
        }),
      );

      if (!updateChapter.fulfilled.match(result)) {
        throw new Error("No se pudo editar el capitulo");
      }

      if (id_subject) {
        await dispatch(fetchSubjectById(id_subject));
      }

      setUpdated(true);
      setTimeout(() => {
        dispatch(toggleModal());
        setUpdated(false);
      }, 1500);
    } catch (error) {
      setSubmitError("No se pudo editar el capitulo");
      console.error("Error editando capitulo:", error);
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
      className="w-full bg-lightSecondary dark:bg-darkSecondary p-6 rounded-md border border-lightBorder dark:border-darkBorder"
    >
      <FormInput
        label={`Nombre actual: ${item?.name ?? ""}`}
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.name}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label={`Descripcion actual: ${item?.description ?? ""}`}
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.description}
        errorTextStyles={errorTextStyles}
      />

      <FormInput
        label={`Orden actual: ${item?.order ?? ""}`}
        name="order"
        type="number"
        value={values.order}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.order}
        errorTextStyles={errorTextStyles}
      />

      <Button
        btnName={loading ? "Guardando..." : "Terminar edicion"}
        type="submit"
        bgLight="bg-lightDetail"
        bgDark="dark:bg-darkDetail"
        icon={<CiEdit />}
      />

      {submitError && (
        <Ptxt
          text={submitError}
          aditionalStyle="mt-4 text-lightWarning dark:text-darkWarning"
        />
      )}

      {updated && <Ptxt text="Capitulo editado exitosamente" />}
    </form>
  );
};

export default EditChapterForm;
