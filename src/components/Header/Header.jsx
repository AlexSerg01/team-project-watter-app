import { Logo } from "../Logo/Logo";
import {
  HeaderContainer,
  HeaderStyle,
  SignInLink,
  SignInIcon,
} from "./Header.styled";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import icons from "../../assets/icons.svg";
import { useSelector } from "react-redux";

export const Header = () => {
  const isLogedin = useSelector((state) => state.auth.isAuthenticated);

  return (
    <HeaderStyle>
      <HeaderContainer>
        <Logo />
        {isLogedin ? (
          <DropDownMenu />
        ) : (
          //* Зробити заміну іконки при зміні теми та кольору тексту*/
          <SignInLink href="/signin">
            Sign in
            <SignInIcon>
              <use href={`${icons}#icon-user`} />
            </SignInIcon>
          </SignInLink>
        )}
      </HeaderContainer>
    </HeaderStyle>
  );
};
