import { useState, useEffect, useRef } from "react";
import {
  DropDownContainer,
  DropDownBtn,
  UserName,
  UserAvatar,
  ChevronIcon,
  Menu,
  MenuItem,
  CreateAvatar,
} from "./DropDownMenu.styled";
import icons from "../../assets/icons.svg";
import SettingModal from "../SettingModal/SettingModal";
import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";

import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, selectUserPhoto } from "../../redux/user/selectors.js";
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

  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectUserPhoto);

  return (
    <>
      <DropDownContainer ref={menuRef}>
        <DropDownBtn onClick={toggleMenu}>
          <UserName>{userName}</UserName>
          {avatar ? (
            <UserAvatar
              src={avatar}
              alt="User's Avatar"
              width="28"
              height="28"
            />
          ) : (
            <CreateAvatar>
              {userName?.charAt(0).toUpperCase() || ""}
            </CreateAvatar>
          )}
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
