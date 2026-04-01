// import CourseCards from "../../components/organisms/common/courseCards.organism";
import Hero from "../../components/organisms/common/hero.organism";
import Content from "../../components/molecules/content.molecule";
import LoginButton from "../../components/molecules/loginButton.molecule";
import SubjectCarousel from "../../components/organisms/common/subjectCarousel.organism";
import Section from "../../components/molecules/section.molecule";
import Ptxt from "../../components/atoms/P.atom";
import H1 from "../../components/atoms/h1.atom";
import { useEffect, useState } from "react";
import type { Subject } from "../../../../BR/domain/entities/subject.interface";
import { SubjectApiRepository } from "../../../../BR/infrastructure/repositories/subjectApiRepository";

const Landing = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const repo = new SubjectApiRepository();
    repo.getAll().then(setSubjects).catch((err) => {
      console.error("Failed to load subjects", err);
    });
  }, []);

  return (
    <Content title="">
      <Hero />

      <Section title="">
        <div className="max-w-3xl mx-auto text-center py-8">
          <H1 text="Aprendé con metodología activa" />
          <Ptxt text="En Campus trabajamos con proyectos y práctica constante. Descubrí contenidos diseñados por docentes con experiencia." aditionalStyle="mt-4" />
        </div>
      </Section>

      <SubjectCarousel items={subjects} />

      <Section title="">
        <div className="max-w-2xl mx-auto text-center py-8">
          <h2 className="text-xl font-semibold mb-4">Empezá ahora</h2>
          <p className="mb-6">Registrate con tu cuenta de Google para acceder a materiales y cursos.</p>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </Section>
    </Content>
  );
};

export default Landing;
