import { useEffect } from "react";

import type { closeBackground } from "../../interfaces/closeBackground";

const CloseBackground: React.FC<closeBackground> = ({ isOpen, action }) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div
          onClick={action}
          // className="fixed inset-0 z-40 bg-white/50 backdrop-blur-sm hover:opacity-65 cursor-pointer transition-all duration-200"
          className="fixed inset-0 z-40 bg-gradient-to-br from-darkBorder/70 via-lightAccent/40 to-darkAccent/80 backdrop-blur-sm hover:opacity-80 cursor-pointer transition-all duration-200"
        />
      )}
    </div>
  );
};

export default CloseBackground;
