import Content from "../../components/molecules/content.molecule";
import Image from "../../components/atoms/image.atom";
import H1 from "../../components/atoms/h1.atom";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";
import Button from "../../components/atoms/button.atom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LoginButton from "../../components/molecules/loginButton.molecule";
import { useEffect, useState } from "react";
import { SubjectApiRepository } from "../../../BR/infrastructure/repositories/subjectApiRepository";
import type { Subject } from "../../../BR/domain/entities/subject.interface";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const repo = new SubjectApiRepository();
    repo.getAll().then(setSubjects).catch((err) => {
      console.error("Failed to load subjects", err);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <Content title="">
      {/* Hero built with atoms */}
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
            <Image src="/src/assets/monopc.svg" alt="hero banner" />
          </div>
        </div>
      </div>

      {/* Intro text */}
      <div className="max-w-3xl mx-auto text-center py-8">
        <H1 text="Aprendé con metodología activa" />
        <Ptxt text="En Campus trabajamos con proyectos y práctica constante. Descubrí contenidos diseñados por docentes con experiencia." aditionalStyle="mt-4" />
      </div>

      {/* Simple carousel implemented with atoms */}
      <div className="max-w-4xl mx-auto py-8">
        <H2 text="Algunas materias" />
        {subjects.length > 0 ? (
          <div className="relative mt-4">
            <div className="rounded border border-lightBorder dark:border-darkBorder bg-lightDetail dark:bg-darkDetail p-6">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold font-pixelify text-lightText dark:text-darkText">{subjects[0].name}</h3>
                  <Ptxt text={subjects[0].description ?? ""} aditionalStyle="mt-2" />
                  <Ptxt text={`Profesor: ${subjects[0].creator?.name ?? "-"}`} aditionalStyle="mt-3 text-sm" />
                </div>
              </div>
            </div>
            {/* controls */}
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <button className="p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText border border-lightBorder dark:border-darkBorder">
                <FiChevronLeft />
              </button>
            </div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <button className="p-2 rounded-full bg-lightPrimary/80 dark:bg-darkPrimary/80 text-lightText dark:text-darkText border border-lightBorder dark:border-darkBorder">
                <FiChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <Ptxt text="Cargando materias..." />
        )}
      </div>

      {/* CTA login google */}
      <div className="max-w-2xl mx-auto text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Empezá ahora</h2>
        <p className="mb-6">Registrate con tu cuenta de Google para acceder a materiales y cursos.</p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </Content>
  );
};

export default Landing;
