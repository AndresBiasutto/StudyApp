import ButtonSquare from "../atoms/buttonSquare.atom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2 p-1 border border-lightBorder dark:border-darkBorder rounded font-sharetech text-lightText">
      <input
        className="w-full font-vt323 placeholder:italic placeholder:text-gray-600 dark:placeholder:text-gray-400"
        type="search"
        placeholder="buscar"
      />
      <ButtonSquare
        btnName={"buscar"}
        icon={<FaSearch />}
        bgLight="bg-lightSecondary"
        bgDark="dark:bg-darkSecondary"
      />
    </div>
  );
};

export default SearchBar;
