import { useEffect, useState } from "react";

const VideoModal = ({
  thumbnail = "",
  title = "Ver video",
  videoUrl = "",
  type = "iframe", // "iframe" | "video"
}) => {
  const [open, setOpen] = useState(false);

  // Bloquear scroll del body
  useEffect(() => {
    // document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* THUMBNAIL */}
      <button
        onClick={() => setOpen(true)}
        className="relative group rounded-xl overflow-hidden shadowDN max-w-14 max-h-14"
        aria-label={title}
      >
        <img src={thumbnail} alt={title} className="w-full rounded-xl" />

        {/* Play icon */}
        <div className="absolute inset-0 center bg-black/30 group-hover:bg-black/40 transition">
          <div className="w-8 h-8 rounded-full bg-lightPrimary dark:bg-darkPrimary center shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-lightText dark:text-darkText ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Modal content */}
          <div className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-xl overflow-hidden border border-lightBorder dark:border-darkBorder">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 z-10 text-lightText dark:text-darkText hover:text-lightWarning dark:hover:text-darkWarning"
            >
              ✕
            </button>

            {/* VIDEO */}
            {type === "iframe" ? (
              <iframe
                src={videoUrl}
                title={title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
