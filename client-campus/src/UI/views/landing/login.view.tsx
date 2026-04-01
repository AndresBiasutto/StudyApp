import LoginForm from "../../components/organisms/forms/landingForms/loginForm.organism";
import LoginButton from "../../components/molecules/loginButton.molecule";
import Ptxt from "../../components/atoms/P.atom";
import NavItem from "../../components/atoms/navItem.atom";
import Content from "../../components/molecules/content.molecule";

const Login = () => {
  return (
    <Content title="Iniciar Sesión">
      <LoginForm />

      <div className="mt-4 flex justify-center">
        <LoginButton />
      </div>

      <div className="mt-6 text-center">
        <Ptxt text="¿Aún no tienes cuenta?" />
        <ul className="inline-block mt-2">
          <NavItem to="/register" text="Registrate" />
        </ul>
      </div>
    </Content>

  );
};

export default Login;
