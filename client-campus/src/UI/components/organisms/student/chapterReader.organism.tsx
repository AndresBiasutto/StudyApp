import H3 from "../../atoms/h3.atom";
import VideoModal from "../../molecules/videoModal.molecule";
import videoImage from "../../../../assets/monopc.svg";
import ChapterHeader from "../../molecules/chapterReader/chapterHeader.molecule";
import ChapterArticle from "../../molecules/chapterReader/chapterArticle.molecule";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../store/slices/uiSlice";
import type { chapterReader } from "../../../interfaces/chapterReader";

const ChapterReader: React.FC<chapterReader> = ({
  chapter,
  setSidebarOpen,
}) => {
  const dispatch = useDispatch();
  const embeddedVideoUrl = (chapter.video_url ?? "").replace(
    "youtu.be/",
    "www.youtube.com/embed/",
  );

  return (
    <main className="bg-lightPrimary dark:bg-darkPrimary flex flex-col w-full min-h-screen overflow-y-auto p-4 md:p-6 md:ml-64">
      <button
        className="md:hidden mb-6 px-4 py-2 rounded border border-lightBorder dark:border-darkBorder font-sharetech text-sm"
        onClick={() => setSidebarOpen(true)}
      >
        Ver indice
      </button>
      <button
        className="mb-6 px-4 py-2 rounded border border-lightBorder dark:border-darkBorder font-sharetech text-sm"
        onClick={() => dispatch(toggleModal())}
      >
        Ver modal
      </button>
      <section className="w-full mx-auto space-y-8">
        <ChapterHeader
          text={chapter.name}
          text2={`Capítulo ${chapter.order ?? "-"}`}
          text3={chapter.description ?? ""}
        />
        <ChapterArticle text={chapter.content_html ?? ""} />
        <H3 text="Material adicional" />
        <div className="bg-lightPrimary dark:bg-darkPrimary border border-lightBorder dark:border-darkBorder rounded-lg p-4">
          <VideoModal
            thumbnail={videoImage}
            title={chapter.name}
            videoUrl={embeddedVideoUrl}
            type="iframe"
          />
        </div>
      </section>
    </main>
  );
};

export default ChapterReader;
