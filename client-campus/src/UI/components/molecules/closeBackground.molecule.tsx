import type { closeBackground } from "../../interfaces/closeBackground";

const CloseBackground: React.FC<closeBackground> = ({ isOpen, action }) => {
  return (
    <div>
      {isOpen && (
        <div
          onClick={action}
          // className="fixed inset-0 z-40 blurred-element hover:opacity-65 cursor-pointer transition-all duration-200"
          className="fixed inset-0 z-40 blur-filter hover:opacity-80 cursor-pointer transition-all duration-200"
        />
      )}
    </div>
  );
};

export default CloseBackground;
