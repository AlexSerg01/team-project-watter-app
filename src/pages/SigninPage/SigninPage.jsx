import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../redux/auth/operations";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/"); // Redirect to HomePage
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <AuthForm type="signin" onSubmit={handleSignin} />
      <p>
        Don`t have an account? <a href="/signup">Sign Up</a>
      </p>
      <p>
        <a href="/forgot-password">Forgot your password?</a>
      </p>
    </div>
  );
};

export default SigninPage;
