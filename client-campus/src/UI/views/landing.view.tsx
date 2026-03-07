import CourseCards from "../components/organisms/common/courseCards.organism";
import Hero from "../components/organisms/common/hero.organism";
import Content from "../components/molecules/content.molecule";
import LoginButton from "../components/molecules/loginButton.molecule";

const Landing = () => {
  return (
    <Content title="">
      <LoginButton />
      <Hero />
      <CourseCards />
    </Content>
  );
};

export default Landing;
