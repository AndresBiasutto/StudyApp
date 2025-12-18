export interface IButtonProps {
  btnName: string;
  action: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  bgLight?: string;
  bgDark?: string;
}