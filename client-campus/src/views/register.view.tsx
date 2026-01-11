import NavItem from "../UI/atoms/navItem.atom";
import GridSection from "../UI/molecules/gridSection.molecule";
import FormFooter from "../UI/organisms/forms/formFooter.organism";
import FormHeader from "../UI/organisms/forms/formHeader.organism";
import RegisterForm from "../UI/organisms/forms/registerForm.organism";
import logo from "../assets/logo.svg"
const Register = () => {
  return (
          <div className="flex flex-col items-center-safe justify-center p-6 rounded bg-lightSecondary dark:bg-darkSecondary">  
      <FormHeader title="mono registrado es mono feliz" image={logo} />
      <RegisterForm />
      <FormFooter title="¿mono no puede registrarse?" >
        <GridSection gridCols="2">
          <NavItem to={"/"} text="login" />
          <NavItem to={"/"} text="recuperar cuenta" />
        </GridSection>
      </FormFooter>
    </div>
  );
};

export default Register;
