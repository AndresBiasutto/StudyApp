import React from "react";
import H3 from "../../atoms/h3.atom";
import type { formHeader } from "../../../interfaces/registerFormHeader";
import Image from "../../atoms/image.atom";

const FormHeader: React.FC<formHeader> = ({ title, image }) => {
  return (
    <header className="flex flex-col items-center justify-center my-10">
      <H3 text={title} />
      <Image src={image} alt={title} className="w-min" />
    </header>
  );
};

export default FormHeader;
