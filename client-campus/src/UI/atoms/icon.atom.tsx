import type { iconProps } from "../../interfaces/icon";

const Icon:React.FC<iconProps> = ({icon}) => {
  return (
    <i className="font-pixelify text-center items-center text-lightText dark:text-darkText">
      {icon}
    </i>
  );
};

export default Icon;
