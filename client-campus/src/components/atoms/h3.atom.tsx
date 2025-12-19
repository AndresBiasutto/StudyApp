import type { textProps } from "../../interfaces/textProps";

const H3: React.FC<textProps> = ({ text }) => {
  return (
    <h2 className="font-bold font-pixelify text-lightText dark:text-darkText transition-all">
      {text}
    </h2>
  );
};

export default H3;