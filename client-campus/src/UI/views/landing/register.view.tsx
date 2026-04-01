import RegisterForm from "../../components/organisms/forms/landingForms/registerForm.organism";
import Content from "../../components/molecules/content.molecule";
import H2 from "../../components/atoms/h2.atom";
import Ptxt from "../../components/atoms/P.atom";

const Register = () => {
  return (
    <Content title="Registrarse">
      <div className="flex flex-col items-center-safe justify-center p-6 rounded bg-lightSecondary dark:bg-darkSecondary">
        <H2 text="Crear cuenta" />
        <Ptxt text="Completá el formulario para registrarte" aditionalStyle="mb-4" />
        <RegisterForm />
      </div>
    </Content>
  );
};

export default Register;
