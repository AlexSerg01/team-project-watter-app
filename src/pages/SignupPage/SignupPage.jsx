import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthFrom/AuthForm";
import css from "./Signup.module.css";

import BottleSigninDesktop from "../../assets/images/signin/BottleSignin-Desktop/Bottle-for-Sign-in.png";
import BottleSigninDesktop2x from "../../assets/images/signin/BottleSignin-Desktop/Bottle-for-Sign-in@2x.png";
import BottleSigninTablet from "../../assets/images/signin/BottleSignin-Tablet/Bottle-for-Sign-in.png";
import BottleSigninTablet2x from "../../assets/images/signin/BottleSignin-Tablet/Bottle-for-Sign-in@2x.png";
import BottleSigninMobile from "../../assets/images/signin/BottleSignin-Mobile/Bottle-for-Sign-in.png";
import BottleSigninMobile2x from "../../assets/images/signin/BottleSignin-Mobile/Bottle-for-Sign-in@2x.png";

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
      <div className={css.image_container}>
        <picture>
          <source
            media="(min-width: 1158px)"
            srcSet={`${BottleSigninDesktop} 1x, ${BottleSigninDesktop2x} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${BottleSigninTablet} 1x, ${BottleSigninTablet2x} 2x`}
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${BottleSigninMobile} 1x, ${BottleSigninMobile2x} 2x`}
          />
          <img
            src={BottleSigninDesktop}
            alt="bottle"
            width="360"
            height="300"
            className={css.img}
          />
        </picture>
      </div>
      <div className={css.form_container}>
        <h2 className={css.block_name}>Sign Up</h2>
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
