import React from "react";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import Ptxt from "../../atoms/P.atom";

const SubjectCard: React.FC<{ subject: Subject }> = ({ subject }) => {
  return (
    <div className="p-4 rounded-lg bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder shadow-sm">
      <h3 className="text-xl font-semibold font-pixelify text-lightText dark:text-darkText">{subject.name}</h3>
      <Ptxt text={subject.description ?? ""} aditionalStyle="mt-2 text-sm" />
      {subject.creator?.name && (
        <p className="mt-3 text-sm text-lightSecondary dark:text-darkSecondary">Profesor: <strong>{subject.creator.name}</strong></p>
      )}
    </div>
  );
};

export default SubjectCard;
