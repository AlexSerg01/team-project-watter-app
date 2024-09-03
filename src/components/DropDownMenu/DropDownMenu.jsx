import { useState, useEffect, useRef } from "react";
import avatar from "../../assets/images/avatar.png";
import {
  DropDownContainer,
  DropDownBtn,
  UserName,
  UserAvatar,
  ChevronIcon,
  Menu,
  MenuItem,
} from "./DropDownMenu.styled";
import icons from "../../assets/icons.svg";
import SettingModal from "../SettingModal/SettingModal";
import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";


export const DropDownMenu = () => {
  //все пов'язане з юзером замінити на данні з БД та видалити картинку для аватар
  const userName = "David";
  const userAvatar = avatar;

  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const menuRef = useRef(null);

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
    setActiveModal(action);
    setIsOpen(false);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <>
      <DropDownContainer ref={menuRef}>
        <DropDownBtn onClick={toggleMenu}>
          <UserName>{userName}</UserName>
          <UserAvatar
            src={userAvatar}
            alt="User`s Avatar"
            width="28"
            height="28"
          ></UserAvatar>
          <ChevronIcon>
            <use href={`${icons}#icon-chevron-down`} />
          </ChevronIcon>
        </DropDownBtn>
        {isOpen && (
          <Menu>
            <MenuItem onClick={() => handleMenuItemClick("setting")}>
              <svg width="16" height="16">
                <use href={`${icons}#icon-setting`} />
              </svg>
              Setting
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("logout")}>
              <svg width="16" height="16">
                <use href={`${icons}#icon-logout`} />
              </svg>
              Log out
            </MenuItem>
          </Menu>
        )}
      </DropDownContainer>
      {activeModal === "setting" && <SettingModal
        isOpen={true}
        onClose={handleModalClose}
        userData={{
          photo: userAvatar,
          name: userName,
          email: "david401@gmail.com",
          gender: "male",
        }}
        onSave={(data) => console.log("Saved data:", data)}
         />}
      {activeModal === "logout" && <UserLogoutModal isOpen={true} onClose={handleModalClose} />}
    </>
  );
};