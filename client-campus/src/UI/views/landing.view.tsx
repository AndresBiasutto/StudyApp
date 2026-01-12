import CourseCards from "../organisms/courseCards.organism";
import Hero from "../organisms/hero.organism";
import Content from "../molecules/content.molecule";

const Landing = () => {
  return (
    <Content title="">
      <Hero />
      <CourseCards />
    </Content>
  );
};

export default Landing;
