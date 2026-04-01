import LoginForm from "../../components/organisms/forms/landingForms/loginForm.organism";
import LoginButton from "../../components/molecules/loginButton.molecule";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center-safe justify-center p-6 rounded bg-lightSecondary dark:bg-darkSecondary">
      <LoginForm />

      <div className="mt-4 flex justify-center">
        <LoginButton />
      </div>

      <p className="mt-6 text-center text-sm text-lightText dark:text-darkText">
        ¿Aún no tienes cuenta?{' '}
        <Link to="/register" className="text-lightAccent dark:text-darkAccent underline">
          Registrate
        </Link>
      </p>
    </div>
  );
};

export default Login;
