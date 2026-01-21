
export interface IButtonProps {
  btnName: string;
  action?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  bgLight?: string;
  bgDark?: string;
  type?: "button" | "submit" | "reset"  // ← Especifica solo estos valores
}