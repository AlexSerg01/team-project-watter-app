import { Logo } from "../Logo/Logo";
import { HeaderContainer, HeaderStyle, SignInLink, SignInIcon } from "./Header.styled";
import nonAvatarWhite from "../../assets/nonAvatarWhite.svg"

export const Header = () => {

  return (
    <HeaderStyle>
      <HeaderContainer>
        <Logo/>
        {/* Зробити заміну іконки при зміні теми та кольору тексту*/}
        <SignInLink href="/signin">Sign in
          <SignInIcon src={nonAvatarWhite} alt="Sign in icon" /> 
        </SignInLink>
      </HeaderContainer>
    </HeaderStyle>
  )
}