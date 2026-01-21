import { useState } from "react";

type FormValues = Record<string, string>;
type FormErrors<T extends FormValues> = Partial<Record<keyof T, string>>;

export const useForm = <T extends FormValues>(
  initialState: T,
  validate: (data: T) => FormErrors<T>
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =
    (onSubmit: (values: T) => void) =>
    (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      }
    };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};
