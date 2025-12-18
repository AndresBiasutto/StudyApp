import H1 from "../atoms/h1.atom";
import CourseCards from "../organisms/courseCards.organism";

const Content = () => {
  return (
    <div className=" dark:bg-darkPrimary bg-avocado-200 flex flex-col flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto  p-6">
        <H1 text={"titulo"} />
        <CourseCards />
      </main>
    </div>
  );
};

export default Content;
