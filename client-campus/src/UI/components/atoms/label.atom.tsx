import type { textProps } from "../../interfaces/textProps";

const Label: React.FC<textProps> = ({ text }) => {
  return (
    <label htmlFor={text} className="block text-sm font-bold font-sharetech mb-2 text-lightText dark:text-darkText">
      {text}
    </label>
  );
};

export default Label;
