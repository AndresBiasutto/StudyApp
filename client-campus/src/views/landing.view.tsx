import CourseCards from "../UI/organisms/courseCards.organism";
import Hero from "../UI/organisms/hero.organism";
import Content from "../UI/molecules/content.molecule";

const Landing = () => {
  return (
    <Content title="">
      <Hero />
      <CourseCards />
    </Content>
  );
};

export default Landing;
