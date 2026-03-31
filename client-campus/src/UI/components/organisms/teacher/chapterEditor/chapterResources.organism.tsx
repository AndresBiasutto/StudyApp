import type React from "react";
import { FaLink, FaVideo } from "react-icons/fa";
import { FiImage, FiPlus } from "react-icons/fi";

import DynamicResourceInput from "../../../molecules/teacher/dynamicResourceInput.molecule";
import EditorCard from "../../../atoms/editorCard.atom";
import H2 from "../../../atoms/h2.atom";
import Ptxt from "../../../atoms/P.atom";
import EditorInput from "../../../atoms/editorInput.atom";
import ButtonSquare from "../../../atoms/buttonSquare.atom";
import { createResourceItem, type ResourceItem } from "./chapterResources.types";

interface ChapterResourcesProps {
  videoUrl: string;
  setVideoUrl: (v: string) => void;
  images: ResourceItem[];
  setImages: React.Dispatch<React.SetStateAction<ResourceItem[]>>;
  links: ResourceItem[];
  setLinks: React.Dispatch<React.SetStateAction<ResourceItem[]>>;
}

const ChapterResources: React.FC<ChapterResourcesProps> = ({
  videoUrl,
  setVideoUrl,
  images,
  setImages,
  links,
  setLinks,
}) => {
  const handleResourceChange = (
    id: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>,
  ) => {
    setter((current) => current.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const addResourceField = (setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>) => {
    setter((current) => [...current, createResourceItem()]);
  };

  const removeResourceField = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<ResourceItem[]>>,
  ) => {
    setter((current) =>
      current.length === 1
        ? current.map((item) => (item.id === id ? { ...item, value: "" } : item))
        : current.filter((item) => item.id !== id),
    );
  };

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <EditorCard>
        <div className="mb-3 flex items-center gap-2">
          <FaVideo className="text-lightText dark:text-darkText" />
          <H2 text="Video" />
        </div>
        <EditorInput
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          placeholder="https://youtube.com/..."
        />
        <Ptxt
          text="Puedes pegar un enlace de YouTube, Vimeo o cualquier video externo."
          aditionalStyle="mt-3"
        />
      </EditorCard>

      <EditorCard>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FiImage className="text-lightText dark:text-darkText text-xl" />
            <H2 text="Imagenes" />
          </div>
          <ButtonSquare
            btnName="Agregar"
            icon={<FiPlus />}
            action={() => addResourceField(setImages)}
            bgLight="bg-lightDetail hover:bg-lightAccent"
            bgDark="dark:bg-darkDetail dark:hover:bg-darkAccent"
          />
        </div>

        <div className="flex flex-col gap-3">
          {images.map((item, index) => (
            <DynamicResourceInput
              key={item.id}
              value={item.value}
              placeholder={`URL de imagen ${index + 1}`}
              onChange={(val) => handleResourceChange(item.id, val, setImages)}
              onRemove={() => removeResourceField(item.id, setImages)}
            />
          ))}
        </div>
      </EditorCard>

      <EditorCard>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaLink className="text-lightText dark:text-darkText text-xl" />
            <H2 text="Links utiles" />
          </div>
          <ButtonSquare
            btnName="Agregar"
            icon={<FiPlus />}
            action={() => addResourceField(setLinks)}
            bgLight="bg-lightDetail hover:bg-lightAccent"
            bgDark="dark:bg-darkDetail dark:hover:bg-darkAccent"
          />
        </div>

        <div className="flex flex-col gap-3">
          {links.map((item, index) => (
            <DynamicResourceInput
              key={item.id}
              value={item.value}
              placeholder={`URL de referencia ${index + 1}`}
              onChange={(val) => handleResourceChange(item.id, val, setLinks)}
              onRemove={() => removeResourceField(item.id, setLinks)}
            />
          ))}
        </div>
      </EditorCard>
    </section>
  );
};

export default ChapterResources;
