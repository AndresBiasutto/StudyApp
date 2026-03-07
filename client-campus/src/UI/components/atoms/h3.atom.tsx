import type { textProps } from "../../interfaces/textProps";

const H3: React.FC<textProps> = ({ text, aditionalStyle }) => {
  return (
    <h2 className={`font-bold font-pixelify text-lightText dark:text-darkText transition-all ${aditionalStyle}`} >
      {text}
    </h2>
  );
};

export default H3;