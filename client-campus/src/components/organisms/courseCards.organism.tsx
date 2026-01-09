import { useState } from "react";
import CourseCard from "../molecules/cards/chapterCard.molecule";
import { courses } from "../../Data";
import Pagination from "../molecules/pagination.molecule";
import Section from "../molecules/section.molecule";
import GridSection from "../molecules/gridSection.molecule";

const ITEMS_PER_PAGE = 3;

const CourseCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCourses = courses.slice(startIndex, endIndex);
  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };
  const handleBack = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };
  return (
    <Section title="Materias mas vistas">
      <GridSection gridCols="3">
        {visibleCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.name}
            text={course.description}
            image={course.image}
          />
        ))}
      </GridSection>
      <Pagination
        back={handleBack}
        next={handleNext}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Section>
  );
};

export default CourseCards;
