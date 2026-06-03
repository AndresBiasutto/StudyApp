import Content from "../../components/molecules/content.molecule";
import Image from "../../components/atoms/image.atom";
import logo from "../../../assets/monopc.svg";
import H1 from "../../components/atoms/h1.atom";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";
import Button from "../../components/atoms/button.atom";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Content title="">
      <div className="w-full h-full p-4 rounded-2xl bg-lightSecondary dark:bg-darkSecondary transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <H1 text="MONO SAPIENS" />
            <Ptxt text="Mono que estudia es mono feliz" aditionalStyle="mt-3" />
            <div className="mt-4 w-48">
              <Button
                btnName="empezá ahora"
                action={() => navigate("/login")}
                bgLight="bg-lightSuccess"
                bgDark="dark:bg-darkSuccess"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image src={logo} alt="hero banner" />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center py-8">
        <H1 text="Metodología de mono" />
        <Ptxt
          text="En mono sapiens trabajamos con proyectos y práctica constante. Descubrí contenidos diseñados por mono con experiencia."
          aditionalStyle="mt-4"
        />
      </div>
      <div className="max-w-2xl mx-auto text-center py-8">
        <H2 text="Empezá ahora" />
        <Ptxt
          text="Mono que accede a materiales y cursos es mono feliz."
          aditionalStyle="mb-6"
        />
        <div className="flex justify-center">
          <Button
            btnName="empezá ahora"
            action={() => navigate("/login")}
            bgLight="bg-lightSuccess"
            bgDark="dark:bg-darkSuccess"
          />{" "}
        </div>
      </div>
    </Content>
  );
};

export default Landing;
