import LoginForm from "../../components/organisms/forms/landingForms/loginForm.organism";

const Login = () => {
  return (
    <div className="flex flex-col items-center-safe justify-center p-6 rounded bg-lightSecondary dark:bg-darkSecondary">
      <LoginForm />
    </div>
  );
};

export default Login;
