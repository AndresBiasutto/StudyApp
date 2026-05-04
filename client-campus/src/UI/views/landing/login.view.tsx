import LoginForm from "../../components/organisms/forms/landingForms/loginForm.organism";
import LoginButton from "../../components/molecules/loginButton.molecule";
import Ptxt from "../../components/atoms/P.atom";
import NavItem from "../../components/atoms/navItem.atom";
import Content from "../../components/molecules/content.molecule";
import DemoAccess from "../../components/organisms/landing/demoAccess.organism";

const Login = () => {
  return (
    <Content title="Iniciar sesion">
      <div className="flex w-full max-w-6xl flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
        <div className="rounded-md bg-lightSecondary p-6 dark:bg-darkSecondary">
          <LoginForm />
          <span className="mx-auto my-4 block h-0.5 w-1/4 bg-lightSecondary dark:bg-darkSecondary" />
          <div className="mt-4 flex justify-center">
            <LoginButton />
          </div>

          <div className="mt-6 text-center">
            <Ptxt text="Mono sin cuenta?" />
            <ul className="mt-2 inline-block">
              <NavItem to="/register" text="Registrate" />
            </ul>
          </div>
        </div>

        <DemoAccess />
      </div>
    </Content>
  );
};

export default Login;
