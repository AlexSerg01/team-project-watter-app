import { LogoStyle } from "./Logo.styled";
import logoHeader from "../../assets/logoHeader.svg";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../../redux/auth/selectors";

export const Logo = () => {
  // замінити isLogedin на данні з БД по юзеру
  const isLogedin = useSelector(isLoggedInSelector);
  const url = isLogedin ? "/home" : "/welcome";
  return (
    <LogoStyle href={url}>
      <img src={logoHeader} alt="Logo" width="102" height="48" />
    </LogoStyle>
  );
};
