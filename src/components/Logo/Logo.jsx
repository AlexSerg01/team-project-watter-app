import styles from './Logo.module.css';
import logoHeader from "../../assets/logoHeader.svg";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../../redux/auth/selectors";

export const Logo = () => {
  const isLogedin = useSelector(isLoggedInSelector);
  const url = isLogedin ? "/home" : "/welcome";
  return (
    <a href={url} className={styles.logoStyle}>
      <img src={logoHeader} alt="Logo" width="102" height="48" className={styles.logoImg}/>
    </a>
  );
};
