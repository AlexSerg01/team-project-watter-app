import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (values, { setSubmitting }) => {
    dispatch(registerUser(values)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate("/home"); // Redirect to HomePage
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <AuthForm type="signup" onSubmit={handleSignup} />
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default SignupPage;
