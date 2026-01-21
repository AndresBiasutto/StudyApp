import { Link } from "react-router-dom";

const LinkTxt:React.FC<{ link: string; text: string }> = ({ link, text }) => {
  return (
    <div>
      <Link target="_blank" className=" font-pixelify text-lightLink dark:text-darkLink underline hover:text-lightDetail dark:hover:text-darkDetail " to={link}>{text}</Link>
    </div>
  );
};

export default LinkTxt;
