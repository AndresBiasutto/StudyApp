import type { contentProps } from "../../interfaces/contentProps";
import H1 from "../atoms/h1.atom";

const Content:React.FC<contentProps> = ({title, children}) => {
  return (
    <div className=" dark:bg-darkPrimary bg-avocado-200 flex flex-col flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto  p-6">
        <H1 text={title} />
        {children}
      </main>
    </div>
  );
};

export default Content;
