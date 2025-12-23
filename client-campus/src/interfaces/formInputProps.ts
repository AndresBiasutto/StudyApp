import type { ChangeEventHandler } from "react";

export interface formInputProps{
  label:string;
  name: string;
  type: string;
  value: string;
  change: ChangeEventHandler<HTMLInputElement>;
  className: string | undefined;
  errors: { firstName?: string };
  errorTextStyles:string | undefined;
}