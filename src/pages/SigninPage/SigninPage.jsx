import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthFrom/AuthForm";
import { loginUser } from "../../redux/auth/operations";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/home"); // Redirect to HomePage
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <AuthForm type="signin" onSubmit={handleSignin} />
      {/* <p>
        <a href="/forgot-password">Forgot your password?</a>
      </p> */}
    </div>
  );
};

export default SigninPage;
