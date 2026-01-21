import React from "react";
import H3 from "../../atoms/h3.atom";

const LiHeader = () => {
  return (
    <li
      className={`w-full grid grid-cols-12 justify-start items-center gap-2 p-2 bg-lightSecondary dark:bg-darkSecondary`}
    >
      <div className="col-span-1  border-r border-lightText dark:border-darkText "></div>
      <div className="col-span-7  border-r border-lightText dark:border-darkText ">
        <H3 text={`Nombre`} />
      </div>
      <div className="col-span-3  ">
        <H3 text={`Rol`} />
      </div>
      <div className=" col-span-1 flex items-center justify-end"></div>
    </li>
  );
};

export default LiHeader;
