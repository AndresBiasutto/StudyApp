import type { contentProps } from "../../interfaces/contentProps";
import H2 from "../atoms/h2.atom";

const Content: React.FC<contentProps> = ({ title, children }) => {
  return (
    <main className="bg-lightPrimary dark:bg-darkPrimary flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto  p-6">
      <H2 text={title} />
      {children}
    </main>
  );
};

export default Content;
