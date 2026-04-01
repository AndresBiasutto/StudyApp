import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "../../molecules/section.molecule";
import SubjectCard from "../../molecules/cards/subjectCard.molecule";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";

interface Props {
  items: Subject[];
}

const SubjectCarousel: React.FC<Props> = ({ items }) => {
  const [idx, setIdx] = useState(0);
  if (!items || items.length === 0) return null;

  const prev = () => setIdx((p) => (p === 0 ? items.length - 1 : p - 1));
  const next = () => setIdx((p) => (p === items.length - 1 ? 0 : p + 1));

  return (
    <Section title="">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden rounded border border-lightBorder dark:border-darkBorder bg-lightDetail dark:bg-darkDetail">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((s, i) => (
              <div key={i} className="w-full flex-shrink-0 px-6 py-8" style={{ minWidth: "100%" }}>
                <SubjectCard subject={s} />
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText border border-lightBorder dark:border-darkBorder hover:bg-lightSecondary dark:hover:bg-darkSecondary transition-colors"
              aria-label="Anterior"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText border border-lightBorder dark:border-darkBorder hover:bg-lightSecondary dark:hover:bg-darkSecondary transition-colors"
              aria-label="Siguiente"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}

        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full ${i === idx ? "bg-lightAccent dark:bg-darkAccent" : "bg-lightBorder dark:bg-darkBorder"}`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SubjectCarousel;
