import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthFrom/AuthForm";
import css from "./Signup.module.css";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (values, { setSubmitting }) => {
    // Очищення поля repeatPassword
    // eslint-disable-next-line no-unused-vars
    const { repeatPassword, ...signupData } = values;

    dispatch(registerUser(signupData)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate("/signin");
      }
      setSubmitting(false);
    });
  };

  return (
    <div className={css.signup_container}>
      <div className={css.form_container}>
        <h2>Sign Up</h2>
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
