import type React from "react";
import { FaBold, FaItalic, FaListOl, FaListUl } from "react-icons/fa";
import { FiType } from "react-icons/fi";
import { MdOutlineHorizontalRule } from "react-icons/md";
import ToolbarButton from "../../atoms/toolbarButton.atom";

interface EditorToolbarProps {
  applyFormat: (command: string, value?: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ applyFormat }) => {
  const toolbarButtons = [
    { icon: <FiType />, label: "Párrafo", command: "formatBlock", value: "p" },
    { icon: <FaBold />, label: "Negrita", command: "bold" },
    { icon: <FaItalic />, label: "Cursiva", command: "italic" },
    { icon: <FaListUl />, label: "Lista", command: "insertUnorderedList" },
    { icon: <FaListOl />, label: "Lista numerada", command: "insertOrderedList" },
    { icon: <MdOutlineHorizontalRule />, label: "Separador", command: "insertHorizontalRule" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {toolbarButtons.map((button) => (
        <ToolbarButton
          key={button.label}
          label={button.label}
          icon={button.icon}
          onClick={() => applyFormat(button.command, button.value)}
          title={button.label}
        />
      ))}
    </div>
  );
};

export default EditorToolbar;
