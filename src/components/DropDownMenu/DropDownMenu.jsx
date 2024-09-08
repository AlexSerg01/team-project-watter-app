import { useState, useEffect, useRef } from "react";
import styles from "./DropDownMenu.module.css";
import icons from "../../assets/icons.svg";
import SettingModal from "../SettingModal/SettingModal";
import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";

import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, selectUserPhoto, selectUserEmail } from "../../redux/user/selectors.js";
import { patchUserInfo } from "../../redux/user/operations.js";

export const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuItemClick = (action) => {
    if (action === "setting") {
      setIsSettingModalOpen(true);
    } else if (action === "logout") {
      setIsLogoutModalOpen(true);
    }
    setIsOpen(false);
  };

  const handleSave = (updatedData) => {
    dispatch(patchUserInfo(updatedData));
  };

  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const userName = name || email || "";
  const avatar = useSelector(selectUserPhoto);

  return (
    <>
      <div className={styles.dropDownContainer} ref={menuRef}>
        <button className={styles.dropDownBtn} onClick={toggleMenu}>
          <p className={styles.userName}>{userName}</p>
          {avatar ? (
            <img
              src={avatar}
              alt="User's Avatar"
              width="28"
              height="28"
              className={styles.userAvatar}
            />
          ) : (
            <div className={styles.createAvatar}>
              {userName?.charAt(0).toUpperCase() || ""}
            </div>
          )}
          <svg className={styles.chevronIcon}>
            <use href={`${icons}#icon-chevron-down`} />
          </svg>
        </button>
        {isOpen && (
          <div className={styles.menu}>
            <button
              className={styles.menuItem}
              onClick={() => handleMenuItemClick("setting")}
            >
              <svg width="16" height="16">
                <use href={`${icons}#icon-setting`} />
              </svg>
              Setting
            </button>
            <button
              className={styles.menuItem}
              onClick={() => handleMenuItemClick("logout")}
            >
              <svg width="16" height="16">
                <use href={`${icons}#icon-logout`} />
              </svg>
              Log out
            </button>
          </div>
        )}
      </div>

      {createPortal(
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
          onSave={handleSave}
        />,
        document.body
      )}

      {createPortal(
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />,
        document.body
      )}
    </>
  );
};
