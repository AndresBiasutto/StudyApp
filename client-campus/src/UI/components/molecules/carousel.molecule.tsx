import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded bg-lightDetail dark:bg-darkDetail border border-lightBorder dark:border-darkBorder">
      <div
        className="flex transition-transform duration-500 ease-out h-[400px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-full h-full object-contain shrink-0"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText hover:bg-lightSecondary dark:hover:bg-darkSecondary transition-colors border border-lightBorder dark:border-darkBorder"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText hover:bg-lightSecondary dark:hover:bg-darkSecondary transition-colors border border-lightBorder dark:border-darkBorder"
          >
            <FiChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex
                    ? "bg-lightAccent dark:bg-darkAccent"
                    : "bg-lightBorder dark:bg-darkBorder"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
