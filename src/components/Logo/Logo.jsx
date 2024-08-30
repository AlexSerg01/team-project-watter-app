import { LogoStyle } from "./Logo.styled";
import logoHeader from "../../assets/logoHeader.svg";

export const Logo = () => {
  return(
    <LogoStyle href='/'>
      <img src={logoHeader} alt="Logo" width="102" height="48" />
    </LogoStyle>
  )
}