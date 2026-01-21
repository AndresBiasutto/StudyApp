import type { ChangeEventHandler} from "react";

export interface inputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  change: ChangeEventHandler<HTMLInputElement>;
  className: string | undefined;
}
