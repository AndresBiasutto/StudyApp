import { useState, type ReactNode } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { TbSchool } from "react-icons/tb";

import { useAppDispatch, useAppSelector } from "../../../../hooks/UseStore.hook";
import { loginWithCredentials } from "../../../../store/slices/authSlice/auth.thunk";
import type { DemoAccount } from "../../../interfaces/demoAccount";
import Button from "../../atoms/button.atom";
import H2 from "../../atoms/h2.atom";
import Ptxt from "../../atoms/P.atom";
import Span from "../../atoms/span.atom";

const demoAccounts: DemoAccount[] = [
  {
    role: "student",
    title: "Alumno demo",
    email: "demo.student@monosapiens.app",
    password: "demo123456",
    description: "Recorre materias, capitulos publicados y experiencia de examen.",
    highlights: [
      "Materias ya asignadas",
      "Capitulos con contenido cargado",
      "Experiencia completa de alumno",
    ],
  },
  {
    role: "teacher",
    title: "Profesor demo",
    email: "demo.teacher@monosapiens.app",
    password: "demo123456",
    description: "Muestra la gestion docente y la edicion de contenido.",
    highlights: [
      "Materias propias cargadas",
      "Unidades y capitulos editables",
      "Flujo de trabajo del profesor",
    ],
  },
  {
    role: "admin",
    title: "Admin demo",
    email: "demo.admin@monosapiens.app",
    password: "demo123456",
    description: "Expone la administracion operativa de la plataforma.",
    highlights: [
      "Gestion de usuarios",
      "Gestion de materias",
      "Vista administrativa general",
    ],
  },
];

const roleMeta: Record<
  DemoAccount["role"],
  {
    icon: ReactNode;
    bgLight: string;
    bgDark: string;
    chipLight: string;
    chipDark: string;
  }
> = {
  student: {
    icon: <TbSchool />,
    bgLight: "bg-lightSuccess",
    bgDark: "dark:bg-darkSuccess",
    chipLight: "bg-lightSuccess/15",
    chipDark: "dark:bg-darkSuccess/20",
  },
  teacher: {
    icon: <FaChalkboardTeacher />,
    bgLight: "bg-lightDetail",
    bgDark: "dark:bg-darkDetail",
    chipLight: "bg-lightDetail/15",
    chipDark: "dark:bg-darkDetail/20",
  },
  admin: {
    icon: <RiAdminLine />,
    bgLight: "bg-lightLink",
    bgDark: "dark:bg-darkLink",
    chipLight: "bg-lightLink/15",
    chipDark: "dark:bg-darkLink/20",
  },
};

const DemoAccess = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [activeRole, setActiveRole] = useState<DemoAccount["role"] | null>(null);

  const handleDemoLogin = async (account: DemoAccount) => {
    setActiveRole(account.role);

    try {
      await dispatch(
        loginWithCredentials({
          e_mail: account.email,
          password: account.password,
        }),
      ).unwrap();
    } finally {
      setActiveRole(null);
    }
  };

  return (
    <section className="w-full rounded-md border border-lightBorder bg-lightSecondary p-6 shadow-md dark:border-darkBorder dark:bg-darkSecondary">
      <div className="mb-6 text-center">
        <H2 text="Acceso demo" />
        <Ptxt
          text="Mostra la plataforma en entrevistas con cuentas listas para alumno, profesor y admin."
          aditionalStyle="mt-2"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {demoAccounts.map((account) => {
          const meta = roleMeta[account.role];

          return (
            <article
              key={account.role}
              className="flex h-full flex-col rounded-md border border-lightBorder bg-lightPrimary p-5 dark:border-darkBorder dark:bg-darkPrimary"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xl text-lightText dark:text-darkText ${meta.chipLight} ${meta.chipDark}`}
                >
                  {meta.icon}
                </div>
                <div>
                  <h3 className="font-pixelify text-lg text-lightText dark:text-darkText">
                    {account.title}
                  </h3>
                  <Ptxt text={account.description} aditionalStyle="text-sm" />
                </div>
              </div>

              <div className="mb-4 space-y-2 rounded-md border border-lightBorder/60 bg-lightSecondary/70 p-3 dark:border-darkBorder/60 dark:bg-darkSecondary/70">
                <div>
                  <Span text="Email" />
                  <Ptxt text={account.email} aditionalStyle="break-all text-sm" />
                </div>
                <div>
                  <Span text="Password" />
                  <Ptxt text={account.password} aditionalStyle="text-sm" />
                </div>
              </div>

              <div className="mb-4 flex-1">
                <Span text="Que puede probar" />
                <ul className="mt-2 space-y-2">
                  {account.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded border border-lightBorder/50 px-3 py-2 text-sm font-sharetech text-lightText dark:border-darkBorder/50 dark:text-darkText"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                btnName={
                  loading && activeRole === account.role
                    ? "Ingresando..."
                    : `Entrar como ${account.title.toLowerCase()}`
                }
                action={() => handleDemoLogin(account)}
                bgLight={meta.bgLight}
                bgDark={meta.bgDark}
                type="button"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DemoAccess;
