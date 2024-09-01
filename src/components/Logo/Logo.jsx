import { LogoStyle } from "./Logo.styled";
import logoHeader from "../../assets/logoHeader.svg";

export const Logo = () => {
  // замінити isLogedin на данні з БД по юзеру
  const isLogedin = false
  const url = isLogedin ? "/home" : "/welcome";
  return(
    <LogoStyle href={url}>
      <img src={logoHeader} alt="Logo" width="102" height="48" />
    </LogoStyle>
  )
}