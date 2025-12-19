import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className="flex justify-center items-center w-full overflow-hidden transition-all">
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-contain ${className}`}
      />
    </div>
  );
};

export default Image;
