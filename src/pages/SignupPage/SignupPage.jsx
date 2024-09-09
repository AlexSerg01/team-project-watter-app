import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import { clearError } from "../../redux/auth/slice"; // Імпортуй clearError
import AuthForm from "../../components/AuthFrom/AuthForm";
import css from "./Signup.module.css";
import { Section } from "../../components/Section/Section";
import { Container } from "../../components/Container/Container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Очищення помилки при завантаженні сторінки
    dispatch(clearError());
  }, [dispatch]);

  const handleSignup = (values, { setSubmitting }) => {
    const { repeatPassword, ...signupData } = values;

    dispatch(registerUser(signupData)).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate("/signin");
      } else if (registerUser.rejected.match(result)) {
        toast.error(result.error.message || "Registration failed");
      }
      setSubmitting(false);
    });
  };

  return (
    <Section className={css.sectionForm}>
      <Container className={css.resetPasswordContainer}>
        <div className={css.titleFormThumb}>
          <h2 className={css.block_name}>Sign Up</h2>
          <AuthForm type="signup" onSubmit={handleSignup} />
        </div>
      </Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className={css.bottleWrapper}></div>
    </Section>
  );
};

export default SignupPage;
