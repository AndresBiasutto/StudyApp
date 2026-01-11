import Image from "../atoms/image.atom";
import Ptxt from "../atoms/P.atom";
import GridSection from "../molecules/gridSection.molecule";
import Section from "../molecules/section.molecule";
import banner from "../../assets/monopc.svg"
import Button from "../atoms/button.atom";

const Hero = () => {
  return (
    <div className="w-full h-full p-4 rounded-2xl bg-lightSecondary dark:bg-darkSecondary transition-all">
      <GridSection gridCols="2" >
        <Section title="MONO SAPIENS">
          <Ptxt text="Mono que estudia es mono feliz" />
          <Button btnName="empezá ahora" action={()=> alert("hola")} bgLight="bg-lightSuccess" bgDark="dark:bg-darkSuccess"  />
        </Section>
        <Section title="">
          <Image src={banner} alt="monoso estudioso" />
        </Section>
        
      </GridSection>
    </div>
  );
};

export default Hero;
