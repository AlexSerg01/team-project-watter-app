import { Logo } from "../Logo/Logo";
import styles from "./Header.module.css";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import icons from "../../assets/icons.svg";
import { useSelector } from "react-redux";

export const Header = () => {
  const isLogedin = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header>
      <div className={styles.headerContainer}>
        <Logo />
        {isLogedin ? (
          <DropDownMenu />
        ) : (
          <a href="/signin" className={styles.signInLink}>
            Sign in
            <svg className={styles.signInIcon}>
              <use href={`${icons}#icon-user`} />
            </svg>
          </a>
        )}
      </div>
    </header>
  );
};
