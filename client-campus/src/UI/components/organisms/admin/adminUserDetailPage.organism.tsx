import React from "react";
import type { userDetailAside } from "../../../interfaces/userDetailAside";
import Span from "../../atoms/span.atom";
import Ptxt from "../../atoms/P.atom";
import LiHeader from "../../molecules/cards/liHeader.molecule";
import LiItem from "../../molecules/cards/liItem.molecule";
import { subjectToLiItem } from "../../../../BR/application/mappers/subjectToLiItem.mapper";
import Button from "../../atoms/button.atom";


const AdminUserDetailPage: React.FC<userDetailAside> = ({ selected }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <div className=" w-full p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
        <div className="w-full flex flex-col  justify-center items-start overflow-clip py-2">
          <Span text={"Bio:"} />
          <Ptxt
            aditionalStyle={"text-wrap"}
            text={`${selected?.description}`}
          />
        </div>
      </div>
      <div className=" w-full p-2 flex flex-col items-center justify-start gap-4 border rounded border-lightBorder dark:border-darkBorder">
        <ul className="w-full flex flex-col items-start justify-start border border-lightBorder dark:border-darkBorder rounded">
          <LiHeader
            title1={`materias de ${selected?.name}`}
            title2={"Estado"}
            key={0}
          />
          {selected?.subjects?.map((item, index) => (
            <LiItem key={index} index={index} item={subjectToLiItem(item)} />
          ))}
          <Button btnName="" />
        </ul>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
