import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import PageLayout from "@components-client/PageLayout";
const RegisterPage = () => {
  return (
    <PageLayout segment="Register">
      <div className="my-8">
        <h3 className="mb-4 text-xl font-bold">Login</h3>
        <LoginForm />
      </div>
      <hr />
      <div className="my-8">
        <h3 className="mb-4 text-xl font-bold">Register</h3>
        <RegisterForm />
      </div>
    </PageLayout>
  );
};
export default RegisterPage;
