import CourseCards from "../components/organisms/courseCards.organism";
import Hero from "../components/organisms/hero.organism";
import Content from "../components/molecules/content.molecule";

const Landing = () => {
  return (
    <Content title="">
      <Hero />
      <CourseCards />
    </Content>
  );
};

export default Landing;
