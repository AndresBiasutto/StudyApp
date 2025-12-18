import { useState } from "react";
import CourseCard from "../molecules/courseCard.molecule";
import { courses } from "../../Data";
import Pagination from "../molecules/pagination.molecule";

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
    <>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        {visibleCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.name}
            text={course.description}
            image={course.image}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <Pagination
          back={handleBack}
          next={handleNext}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default CourseCards;
