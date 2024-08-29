import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthFrom/AuthForm";
import { loginUser } from "../../redux/auth/operations";
import css from "./SigninPage.module.css";

import BottleSigninDesktop from "../../assets/images/signin/BottleSignin-Desktop/Bottle-for-Sign-in.png";
import BottleSigninDesktop2x from "../../assets/images/signin/BottleSignin-Desktop/Bottle-for-Sign-in@2x.png";
import BottleSigninTablet from "../../assets/images/signin/BottleSignin-Tablet/Bottle-for-Sign-in.png";
import BottleSigninTablet2x from "../../assets/images/signin/BottleSignin-Tablet/Bottle-for-Sign-in@2x.png";
import BottleSigninMobile from "../../assets/images/signin/BottleSignin-Mobile/Bottle-for-Sign-in.png";
import BottleSigninMobile2x from "../../assets/images/signin/BottleSignin-Mobile/Bottle-for-Sign-in@2x.png";

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
    <div className={css.signin_container}>
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
          <img src={BottleSigninDesktop} alt="bottle" className={css.img} />
        </picture>
      </div>
      <div className={css.form_container}>
        <h2 className={css.block_name}>Sign In</h2>
        <AuthForm type="signin" onSubmit={handleSignin} />
        {/* <p>
        <a href="/forgot-password">Forgot your password?</a>
      </p> */}
      </div>
    </div>
  );
};

export default SigninPage;
