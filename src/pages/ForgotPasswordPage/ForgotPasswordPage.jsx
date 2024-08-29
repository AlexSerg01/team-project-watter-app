import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div>
      <ForgotPasswordForm />
      <Link to="/sign-in">Sign in</Link>
    </div>
  );
};

export default ForgotPasswordPage;
