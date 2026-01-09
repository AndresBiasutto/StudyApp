import type { closeBackground } from "../../interfaces/closeBackground";

const CloseBackground: React.FC<closeBackground> = ({ isOpen, action }) => {
  return (
    <div>
      {isOpen && (
        <div
          onClick={action}
          className="fixed inset-0 z-40 bg-lightSecondary dark:bg-darkSecondary opacity-50 hover:opacity-65 cursor-pointer transition-all duration-200"
        />
      )}
    </div>
  );
};

export default CloseBackground;
