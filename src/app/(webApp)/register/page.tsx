import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
const Register = () => {
  return (
    <>
      <div className="my-8">
        <h3 className="mb-4 text-xl font-bold">Login</h3>
        <LoginForm />
      </div>
      <hr />
      <div className="my-8">
        <h3 className="mb-4 text-xl font-bold">Register</h3>
        <RegisterForm />
      </div>
    </>
  );
};
export default Register;
