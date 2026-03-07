import type { Role } from "../../BR/domain/entities/role.interface";

export interface selectProps {
  name: string;
  items?: Role[];
  type?: string;
  value?: string;
  className?: string | undefined;
  action?: React.MouseEventHandler<HTMLButtonElement>;
}
