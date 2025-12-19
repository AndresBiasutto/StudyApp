import React from "react";
import ButtonRounded from "../atoms/buttonRounded.atom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { paginationProps } from "../../interfaces/paginationProps";
import Span from "../atoms/span.atom";

const Pagination: React.FC<paginationProps> = ({
  next,
  back,
  currentPage,
  totalPages,
}) => {
  return (
    <div className=" w-full center">
    <div className="flex items-center justify-center gap-4 mt-6">
      <ButtonRounded
        action={back}
        btnName={""}
        icon={<IoIosArrowBack />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
      <Span text={`Página ${currentPage} de ${totalPages}`} />
      <ButtonRounded
        action={next}
        btnName={""}
        icon={<IoIosArrowForward />}
        bgLight="bg-lightAccent"
        bgDark="dark:bg-darkAccent"
      />
    </div>      
    </div>

  );
};

export default Pagination;
