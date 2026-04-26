import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { validateSettings } from "../../../../BR/domain/services/validators/settings.validator";
import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { updateProfile } from "../../../../store/slices/authSlice/auth.thunk";
import type { SettingsFormData } from "../../../interfaces/settingsForm";
import Button from "../../atoms/button.atom";
import Label from "../../atoms/label.atom";
import Ptxt from "../../atoms/P.atom";
import Textarea from "../../atoms/textarea.atom";
import FormInput from "../../molecules/formInput.molecule";

const createInitialState = (selectedUser: {
  name?: string;
  last_name?: string;
  description?: string | null;
  contact_number?: string | null;
}): SettingsFormData => ({
  name: selectedUser.name ?? "",
  last_name: selectedUser.last_name ?? "",
  description: selectedUser.description ?? "",
  contact_number: selectedUser.contact_number ?? "",
});

const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const { selected, updatingProfile } = useAppSelector((state) => state.auth);

  const [values, setValues] = useState<SettingsFormData>(
    createInitialState(selected ?? {}),
  );
  const [errors, setErrors] = useState<Partial<SettingsFormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) {
      return;
    }

    setValues(createInitialState(selected));
  }, [selected]);

  const inputBaseStyles =
    "w-full px-3 py-2 rounded-md bg-lightPrimary dark:bg-darkPrimary " +
    "text-lightText dark:text-darkText border border-lightBorder " +
    "dark:border-darkBorder focus:outline-none focus:ring-2 " +
    "focus:ring-lightAccent dark:focus:ring-darkAccent";

  const errorTextStyles = "mt-1 text-sm text-lightWarning dark:text-darkWarning";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateSettings(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await dispatch(
        updateProfile({
          name: values.name.trim(),
          last_name: values.last_name.trim(),
          description: values.description.trim() || null,
          contact_number: values.contact_number.trim() || null,
        }),
      ).unwrap();

      setSubmitSuccess("Tus datos fueron actualizados correctamente");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No se pudieron actualizar tus datos",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-lightSecondary dark:bg-darkSecondary p-8 rounded-md shadow-md border border-lightBorder dark:border-darkBorder"
    >
      <div className="mb-6">
        <Ptxt text="Actualizá tu información personal. Tu rol permanece sin cambios." />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="Nombre"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className={inputBaseStyles}
          error={errors.name}
          errorTextStyles={errorTextStyles}
        />

        <FormInput
          label="Apellido"
          name="last_name"
          type="text"
          value={values.last_name}
          onChange={handleChange}
          className={inputBaseStyles}
          error={errors.last_name}
          errorTextStyles={errorTextStyles}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="E-mail"
          name="e_mail"
          type="email"
          value={selected?.e_mail ?? ""}
          onChange={() => undefined}
          className={`${inputBaseStyles} opacity-70 cursor-not-allowed`}
          readOnly
          disabled
        />

        <FormInput
          label="Rol"
          name="role"
          type="text"
          value={selected?.Role?.name ?? ""}
          onChange={() => undefined}
          className={`${inputBaseStyles} opacity-70 cursor-not-allowed`}
          readOnly
          disabled
        />
      </div>

      <FormInput
        label="Número de contacto"
        name="contact_number"
        type="text"
        value={values.contact_number}
        onChange={handleChange}
        className={inputBaseStyles}
        error={errors.contact_number}
        errorTextStyles={errorTextStyles}
      />

      <div className="mb-1">
        <Label text="Descripción" />
        <Textarea
          value={values.description}
          onChange={handleChange}
          rows={5}
          className="font-sharetech"
          placeholder="Contanos algo sobre vos"
          name="description"
        />
        {errors.description && (
          <Ptxt text={errors.description} aditionalStyle={errorTextStyles} />
        )}
      </div>

      {submitError && <Ptxt text={submitError} aditionalStyle={errorTextStyles} />}
      {submitSuccess && (
        <Ptxt
          text={submitSuccess}
          aditionalStyle="mt-2 text-sm text-lightLink dark:text-darkLink"
        />
      )}

      <Button
        btnName={updatingProfile ? "Guardando..." : "Guardar cambios"}
        type="submit"
        bgLight="bg-lightLink"
        bgDark="dark:bg-darkLink"
      />
    </form>
  );
};

export default SettingsForm;
