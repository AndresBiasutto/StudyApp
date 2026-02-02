import H3 from "../../atoms/h3.atom";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { RiSortAlphabetDesc } from "react-icons/ri";
import ButtonSquare from "../../atoms/buttonSquare.atom";

interface LiHeaderProps {
  title1: string;
  title2: string;
}

const LiHeader = ({title1, title2}: LiHeaderProps) => {
  return (
    <li
      className={`w-full grid grid-cols-12 justify-start items-center gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary`}
    >
      <div className="col-span-1  border-r border-lightText dark:border-darkText "></div>
      <div className="w-full col-span-7  border-r border-lightText dark:border-darkText ">
        <div className="w-full flex flex-row justify-between items-center pr-2">
        <H3 text={title1} />
        <div className=" w-min flex flex-row items-center justify-center gap-2">
          <ButtonSquare
            btnName="de A hasta Z."
            icon={<RiSortAlphabetAsc />}
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
          />
          <ButtonSquare
            btnName="de Z hasta A."
            icon={<RiSortAlphabetDesc />}
            bgLight="bg-lightDetail"
            bgDark="dark:bg-darkDetail"
          />
        </div>          
        </div>

      </div>
      <div className="col-span-3  ">
        <H3 text={title2} />
      </div>
      <div className=" col-span-1 flex items-center justify-end"></div>
    </li>
  );
};

export default LiHeader;
